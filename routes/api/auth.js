const router = require('express').Router();
const {unsplash, authenticationUrl} = require('../../unsplash');

// @route   GET api/auth
// @desc    Authenticate user & get token
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
        res.json(data.access_token);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Authenticate user with the token
// @access  Public
router.post('/', (req, res) => {
    unsplash.auth.setBearerToken(req.body.token);
    res.status(200).send();
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
