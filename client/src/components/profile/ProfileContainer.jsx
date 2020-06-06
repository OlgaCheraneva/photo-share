import React from 'react';
import PropTypes from 'prop-types';

import sprite from '../../svg/sprite.svg';
import './Profile.css';

const ProfileContainer = ({profile}) => {
    return (
        <div className="profile-container">
            <a href={profile.links.html}>
                <img
                    src={profile.profile_image.large}
                    alt={profile.name}
                    title={profile.name}
                    className="profile-image"
                />
            </a>
            <div className="profile-description">
                <h2 className="profile-name">{profile.name}</h2>
                {profile.bio && (
                    <span className="profile-bio">{profile.bio}</span>
                )}
                {profile.instagram_username && (
                    <a
                        href={
                            'https://www.instagram.com/' +
                            profile.instagram_username
                        }
                    >
                        Instagram
                    </a>
                )}
                <div className="profile-stats">
                    <span className="profile-stats-item profile-total-like">
                        Likes: {profile.total_likes}{' '}
                        <svg className="total-like">
                            <use
                                href={`${sprite}#${
                                    profile.total_likes > 0 ? 'like' : '_like'
                                }`}
                            />
                        </svg>
                    </span>
                    <span className="profile-stats-item profile-total-photo">
                        Photos: {profile.total_photos}
                    </span>
                    <span className="profile-stats-item profile-total-downloads">
                        Downloads: {profile.downloads}
                    </span>
                </div>
            </div>
        </div>
    );
};

ProfileContainer.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileContainer;
