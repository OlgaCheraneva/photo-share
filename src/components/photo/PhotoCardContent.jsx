import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {toggleLike, download} from '../../actions/photos';
import sprite from '../../svg/sprite.svg';

const PhotoCardContent = ({photo, extended = false, toggleLike, download}) => (
    <div className="photo-card__content">
        <div className="photo-card__content-top">
            <div>
                <p>
                    Created by{' '}
                    <a href={photo.user.links.html}>{photo.user.name}</a> on{' '}
                    <a href="https://unsplash.com/?utm_source=photo-share&utm_medium=referral">
                        Unsplash
                    </a>
                </p>
                <p className="photo-card__time">
                    Published at {new Date(photo.created_at).toLocaleString()}
                </p>
            </div>
            <div className="photo-card__likes">
                <label className="photo-card__likes-label">
                    <input
                        className="photo-card__likes-checkbox"
                        type="checkbox"
                        onClick={() =>
                            toggleLike({
                                id: photo.id,
                                liked_by_user: photo.liked_by_user,
                            })
                        }
                    />
                    {photo.likes > 0 ? `${photo.likes} likes` : 'No likes yet'}
                    <svg className="icon mx-1">
                        <use
                            href={`${sprite}#${
                                photo.liked_by_user ? 'like' : '_like'
                            }`}
                        />
                    </svg>
                </label>
            </div>
        </div>
        {extended && (
            <div className="photo-card__content-bottom">
                <p className="my-1">{photo.description}</p>
                <button className="button" onClick={() => download(photo)}>
                    Download
                </button>
            </div>
        )}
    </div>
);

PhotoCardContent.propTypes = {
    photo: PropTypes.object.isRequired,
    extended: PropTypes.bool,
    toggleLike: PropTypes.func.isRequired,
    download: PropTypes.func.isRequired,
};

export default connect(null, {toggleLike, download})(PhotoCardContent);
