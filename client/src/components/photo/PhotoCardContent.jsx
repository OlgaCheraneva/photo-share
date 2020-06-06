import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import CommentContainer from '../comment/CommentContainer';
import {toggleLike} from '../../actions/photos';
import sprite from '../../svg/sprite.svg';

const PhotoCardContent = ({photo, extended = false, toggleLike}) => (
    <div className="photo-card__content">
        <div className="photo-card__content-top">
            <div className="photo-card__info">
                <p>
                    Created by{' '}
                    <Link to={`/profile/${photo.user.username}`}>
                        {photo.user.name}
                    </Link>{' '}
                    on{' '}
                    <a
                        href="https://unsplash.com/?utm_source=photo-share&utm_medium=referral"
                        target="blank"
                    >
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
                <CommentContainer />
            </div>
        )}
    </div>
);

PhotoCardContent.propTypes = {
    photo: PropTypes.object.isRequired,
    extended: PropTypes.bool,
    toggleLike: PropTypes.func.isRequired,
};

export default connect(null, {toggleLike})(PhotoCardContent);
