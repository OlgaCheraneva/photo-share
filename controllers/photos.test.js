const fetch = require('node-fetch');
global.fetch = fetch;

const {getPhotos} = require('./photos');
const {setup} = require('../utils');

test('getPhotos returns photos', async () => {
    const {req, res} = setup();
    const limit = 5;
    req.query = {
        page: 1,
        limit,
        orderBy: 'latest',
        filter: '',
    };
    await getPhotos(req, res);
    expect(res.json).toHaveBeenCalledTimes(1);
    const photos = res.json.mock.calls[0][0];
    console.log(photos);
    expect(photos.length).toBe(limit);
});
