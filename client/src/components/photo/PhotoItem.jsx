import React from 'react';
import PropTypes from 'prop-types';

import PhotoCardContent from './PhotoCardContent';
import './PhotoCard.css';

const Photo = ({photo}) => (
    <section className="photo-card">
        <div className="photo-card__image">
            <a
                href={photo.links.html}
                target="_blank"
                rel="noreferrer noopener"
            >
                <img
                    src={photo.urls.full}
                    alt={photo.alt_description}
                    title={photo.description}
                />
            </a>
        </div>
        <div className="p-1">
            <PhotoCardContent photo={photo} extended={true} />
        </div>
    </section>
);

Photo.propTypes = {
    photo: PropTypes.object.isRequired,
};

export default Photo;
