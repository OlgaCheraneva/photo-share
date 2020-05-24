import React from 'react';
import PropTypes from 'prop-types';

import PhotoLink from './PhotoLink';
import PhotoCardContent from './PhotoCardContent';
import './PhotoCard.css';

const PhotoCard = ({photo, extended = false}) => (
    <section className={`photo-card${!extended && ' photo-card_small mb-1'}`}>
        <div className="photo-card__image">
            <PhotoLink photo={photo} sourceLink={extended}>
                <img
                    className={extended ? '' : 'photo-preview'}
                    src={photo.urls.full}
                    alt={photo.alt_description}
                    title={photo.description}
                />
            </PhotoLink>
        </div>
        <PhotoCardContent photo={photo} extended={extended} />
    </section>
);

PhotoCard.propTypes = {
    photo: PropTypes.object.isRequired,
};

export default PhotoCard;
