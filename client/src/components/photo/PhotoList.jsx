import React from 'react';
import PropTypes from 'prop-types';

import PhotoListItem from './PhotoListItem';
import './PhotoList.css';

const PhotoList = ({photos}) => {
    return (
        <ul className="photo-cards">
            {photos.map((photo) => (
                <PhotoListItem photo={photo} key={photo.id} />
            ))}
        </ul>
    );
};

PhotoList.propTypes = {
    photos: PropTypes.array.isRequired,
};

export default PhotoList;
