const router = require('express').Router();
const {check, validationResult} = require('express-validator');

const {unsplash} = require('../../unsplash');
const User = require('../../db/models/User');

// @route   GET api/profile/:username
// @desc    Get user's profile and photos
// @access  Public
router.get('/:username', async (req, res) => {
    const username = req.params.username;
    const {page, limit} = req.query;
    try {
        const unsplashResponse = await unsplash.users.profile(username);
        if (!unsplashResponse.ok) {
            return res.status(403).json("Can't get the user's profile");
        }
        const userProfile = await unsplashResponse.json();

        const responseUserOwnPhotos = await unsplash.users.photos(
            username,
            page,
            limit
        );
        if (!responseUserOwnPhotos.ok) {
            return res.status(404).json("Can't get the user's photos");
        }
        const userOwnPhotos = await responseUserOwnPhotos.json();
        res.json({userProfile, userOwnPhotos});
    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
});

// @route   GET api/profile/:username/photos
// @desc    Get user's photos
// @access  Public
router.get('/:username/photos', async (req, res) => {
    const username = req.params.username;
    const {page, limit} = req.query;
    try {
        const responseUserOwnPhotos = await unsplash.users.photos(
            username,
            page,
            limit
        );
        if (!responseUserOwnPhotos.ok) {
            return res.status(404).json("Can't get the user's photos");
        }
        const userOwnPhotos = await responseUserOwnPhotos.json();
        res.json({userOwnPhotos});
    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
});

// @route   PUT api/profile/subscriptions/:id
// @desc    Add user subscription
// @access  Public
router.put(
    '/subscriptions/:id',
    [check('username', 'Username is required').not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const userId = req.params.id;
        const username = req.body.username;

        try {
            let user = await User.findOne({id: userId});

            if (!user) {
                user = await User.create({
                    id: userId,
                });
            }

            const unsplashResponse = await unsplash.users.profile(username);
            if (!unsplashResponse.ok) {
                return res.status(403).json("Can't get the user's profile");
            }
            const userToSubscribe = await unsplashResponse.json();

            const newSubscription = ({
                id: userId,
                username,
                name,
                avatar,
            } = userToSubscribe);

            user.subscriptions.push(newSubscription);

            await user.save();

            res.json(user.subscriptions);
        } catch (error) {
            console.error(error);
            res.status(500).json('Server Error');
        }
    }
);

module.exports = router;
