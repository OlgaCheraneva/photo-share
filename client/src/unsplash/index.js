import Unsplash from 'unsplash-js';

const callbackUrl = process.env.REACT_APP_CALLBACK_URL;
const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const secret = process.env.REACT_APP_UNSPLASH_SECRET_KEY;

const unsplash = new Unsplash({
    accessKey,
    secret,
    callbackUrl,
});

export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    'public',
    'write_likes',
]);

export default unsplash;
