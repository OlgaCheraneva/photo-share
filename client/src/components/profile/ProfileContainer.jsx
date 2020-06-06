import React from 'react';
import PropTypes from 'prop-types';

import sprite from '../../svg/sprite.svg';
import './Profile.css';

const ProfileContainer = ({profile}) => {
    return (
        <div className="profile-container">
            <a
                href={profile.links.html}
                target="blank"
                no-opener="true"
                no-referrer="true"
            >
                <img
                    src={profile.profile_image.large}
                    alt={profile.name}
                    title={profile.name}
                    className="profile-image"
                />
            </a>
            <div className="profile-description">
                <a
                    href={profile.links.html}
                    target="blank"
                    no-opener="true"
                    no-referrer="true"
                >
                    <h2 className="profile-name">{profile.name}</h2>
                </a>
                {profile.bio && (
                    <span className="profile-bio">{profile.bio}</span>
                )}
                {profile.instagram_username && (
                    <a
                        href={
                            'https://www.instagram.com/' +
                            profile.instagram_username
                        }
                        target="blank"
                        no-opener="true"
                        no-referrer="true"
                    >
                        Instagram
                    </a>
                )}
                <div className="profile-stats">
                    <span className="profile-stats-item profile-total-like">
                        <svg className="total-like-icon">
                            <use href={`${sprite}#${'_like'}`} />
                        </svg>
                        Likes
                        <span className="stats-count">
                            {profile.total_likes}
                        </span>
                    </span>
                    <span className="profile-stats-item profile-total-photo">
                        <svg className="total-photos-icon">
                            <use href={`${sprite}#photo`} />
                        </svg>{' '}
                        Photos
                        <span className="stats-count">
                            {profile.total_photos}
                        </span>
                    </span>
                    <span className="profile-stats-item profile-total-downloads">
                        <svg className="total-like-icon">
                            <use href={`${sprite}#download-arrow`} />
                        </svg>{' '}
                        Downloads
                        <span className="stats-count">{profile.downloads}</span>
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
