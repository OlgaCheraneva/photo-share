import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import PhotoCardContent from './PhotoCardContent';
import './PhotoCard.css';

const PhotoListItem = ({photo}) => {
    return (
        <div className="photo-card photo-card_small mb-1">
            <div className="photo-card__image">
                <Link to={`/photos/${photo.id}`}>
                    <img
                        className="photo-preview"
                        src={photo.urls.regular}
                        alt={photo.alt_description}
                        title={photo.description}
                    />
                </Link>
            </div>
            <PhotoCardContent photo={photo} />
        </div>
    );
};

PhotoListItem.propTypes = {
    photo: PropTypes.object.isRequired,
};

export default PhotoListItem;
