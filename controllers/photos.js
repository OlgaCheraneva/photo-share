const {unsplash} = require('../unsplash');

const getPhotos = async (req, res) => {
    try {
        const {page, limit, orderBy, filter} = req.query;
        const response = filter
            ? await unsplash.search.photos(filter, page, limit)
            : await unsplash.photos.listPhotos(page, limit, orderBy);
        const data = await response.json();
        if (response.status >= 400) {
            return res.status(404).json(data.errors); // [string]
        }
        res.json(data); // [photo object]
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {getPhotos};
