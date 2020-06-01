const router = require('express').Router();
const {
    accessKey,
    rootURL,
    unsplash,
    authenticationUrl,
} = require('../../unsplash');

async function getUserProfile(token) {
    const response = await fetch(`${rootURL}/me?client_id=${accessKey}`, {
        headers: {Authorization: `Bearer ${token}`},
    });
    const data = await response.json();

    return response.status < 400 ? data : null;
}

// @route   GET api/auth
// @desc    Authenticate user & get token and user profile
// @access  Public
router.get('/', async (req, res) => {
    try {
        const response = await unsplash.auth.userAuthentication(req.query.code);
        const data = await response.json();
        if (response.status >= 400) {
            return res.status(404).json(data.error_description); // string
        }
        const token = data.access_token;
        unsplash.auth.setBearerToken(token);
        const profile = await getUserProfile(token);
        if (!profile) {
            return res.status(403).json("Can't get a profile");
        }
        res.json({token, profile});
    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
});

// @route   POST api/auth
// @desc    Authenticate user with the token and get user profile
// @access  Public
router.post('/', async (req, res) => {
    const token = req.body.token;
    unsplash.auth.setBearerToken(token);

    try {
        const profile = await getUserProfile(token);
        if (!profile) {
            return res.status(403).json("Can't get a profile");
        }
        res.json({profile});
    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
});

// @route   GET api/auth/logout
// @desc    Logout
// @access  Public
router.get('/logout', (_req, res) => {
    unsplash.auth.setBearerToken(null);
    res.status(200).send();
});

// @route   GET api/auth/authenticationUrl
// @desc    Get an authentication URL
// @access  Public
router.get('/authenticationUrl', async (_req, res) => {
    res.json(authenticationUrl);
});

module.exports = router;
