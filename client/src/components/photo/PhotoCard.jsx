import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import PhotoLink from './PhotoLink';
import PhotoCardContent from './PhotoCardContent';
import sprite from '../../svg/sprite.svg';
import {download} from '../../actions/photos';
import './PhotoCard.css';

const PhotoCard = ({photo, extended = false, download}) => (
    <section
        className={`photo-card${extended ? '' : ' photo-card_small mb-1'}`}
    >
        <div className="photo-card__image">
            <PhotoLink photo={photo} sourceLink={extended}>
                <picture>
                    <source
                        media="(max-width: 425px)"
                        srcset={photo.urls.small}
                    />
                    <source
                        media="(max-width: 1440px)"
                        srcset={photo.urls.regular}
                    />
                    <img
                        className={extended ? '' : 'photo-preview'}
                        src={photo.urls.full}
                        alt={photo.alt_description}
                        title={photo.description}
                    />
                </picture>
            </PhotoLink>
            <button
                className="download-button"
                onClick={() => download(photo)}
                title="Download"
            >
                <svg className="download-button__icon">
                    <use href={`${sprite}#download`} />
                </svg>
            </button>
        </div>
        <PhotoCardContent photo={photo} extended={extended} />
    </section>
);

PhotoCard.propTypes = {
    photo: PropTypes.object.isRequired,
    download: PropTypes.func.isRequired,
};

export default connect(null, {download})(PhotoCard);
