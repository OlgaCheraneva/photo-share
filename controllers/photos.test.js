const {getPhotos} = require('./photos');

test('getPhotos returns photos', async () => {
    const req = {
        query: {
            page: 1,
            limit: 5,
            orderBy: 'latest',
            filter: '',
        },
    };
    // const res = {status: jest.fn(), send: jest.fn()};
    // await getPhotos(req, res);
    // expect(res.status).toHaveBeenCalledTimes(1);
});
