import React from 'react';
import PropTypes from 'prop-types';

import PhotoCard from './PhotoCard';
import './PhotoList.css';

const PhotoList = ({photos}) => {
    return (
        <ul className="photo-cards">
            {photos.map((photo) => (
                <PhotoCard photo={photo} key={photo.id} />
            ))}
        </ul>
    );
};

PhotoList.propTypes = {
    photos: PropTypes.array.isRequired,
};

export default PhotoList;
