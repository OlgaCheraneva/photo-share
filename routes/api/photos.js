const router = require('express').Router();
const {unsplash} = require('../../unsplash');
const {check, validationResult} = require('express-validator');

const Photo = require('../../db/models/Photo');

// @route   GET api/photos
// @desc    Get photos
// @access  Public
router.get('/', async (req, res) => {
    try {
        const {page, limit, orderBy} = req.query;
        const response = await unsplash.photos.listPhotos(page, limit, orderBy);
        const data = await response.json();
        if (response.status >= 400) {
            return res.status(404).json(data.errors); // [string]
        }
        res.json(data); // [photo object]
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/photos/:id
// @desc    Get a photo by id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const response = await unsplash.photos.getPhoto(req.params.id);
        const data = await response.json();
        if (response.status >= 400) {
            return res.status(404).json(data.errors); // [string]
        }

        const photo = await Photo.findOne({id: req.params.id});
        data.comments = photo ? photo.comments : [];
        res.json(data); // photo object
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/photos/download/:id
// @desc    Increments the photo download counter
// @access  Public
router.put('/download/:id', (req, res) => {
    unsplash.photos
        .getPhoto(req.params.id)
        .then((res) => res.json())
        .then((photo) => unsplash.photos.downloadPhoto(photo))
        .then((res) => res.json())
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.error(error.message);
            res.status(500).send('Server Error');
        });
});

// @route   PUT api/photos/like/:id
// @desc    Like a photo
// @access  Public
router.put('/like/:id', (req, res) => {
    unsplash.photos
        .likePhoto(req.params.id)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            res.json(data.photo);
        })
        .catch((error) => {
            console.error(error.message);
            res.status(500).send('Server Error');
        });
});

// @route   PUT api/photos/unlike/:id
// @desc    Unlike a photo
// @access  Public
router.put('/unlike/:id', (req, res) => {
    unsplash.photos
        .unlikePhoto(req.params.id)
        .then((res) => res.json())
        .then(({photo}) => res.json(photo))
        .catch((error) => {
            console.error(error.message);
            res.status(500).send('Server Error');
        });
});

// @route   PUT api/photos/comments/:id
// @desc    Add a comment to a photo
// @access  Public
router.put(
    '/comments/:id',
    [
        check('userId', 'User ID is required').not().isEmpty(),
        check('username', 'Username is required').not().isEmpty(),
        check('avatar', 'Avatar is required').not().isEmpty(),
        check('profileURI', 'Profile URI is required').not().isEmpty(),
        check('text', 'Text is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const photoId = req.params.id;
        try {
            let photo = await Photo.findOne({id: photoId});

            if (!photo) {
                photo = await Photo.create({
                    id: photoId,
                });
            }

            const newComment = ({
                userId,
                username,
                avatar,
                profileURI,
                text,
            } = req.body);

            photo.comments.push(newComment);

            await photo.save();

            res.json(photo.comments);
        } catch (error) {
            console.error(error);
            if (error.name === 'CastError') {
                return res.status(400).json(['Cast Error']);
            }
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
