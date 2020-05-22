const Unsplash = require('unsplash-js').default;

const callbackUrl = process.env.CALLBACK_URL;
const accessKey = process.env.UNSPLASH_ACCESS_KEY;
const secret = process.env.UNSPLASH_SECRET_KEY;

const rootURL = `https://api.unsplash.com/`;

const unsplash = new Unsplash({
    accessKey,
    secret,
    callbackUrl,
});

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    'public',
    'write_likes',
    'read_user',
    'write_user',
    'read_photos',
    'write_photos',
]);

module.exports = {accessKey, rootURL, unsplash, authenticationUrl};
