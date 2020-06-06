const router = require('express').Router();
const {unsplash} = require('../../unsplash');

// @route   GET api/profile/:username
// @desc    Get user's profile and photos
// @access  Public
router.get('/:username', async (req, res) => {
    const username = req.params.username;
    const {page, limit} = req.query;
    try {
        const responseProfile = await unsplash.users.profile(username);
        if (!responseProfile.ok) {
            return res.status(403).json("Can't get the user's profile");
        }
        const userProfile = await responseProfile.json();

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

module.exports = router;
