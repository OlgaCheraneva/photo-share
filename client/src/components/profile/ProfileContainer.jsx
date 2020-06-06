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
                <div className="profile-description-header">
                    <a
                        href={profile.links.html}
                        target="blank"
                        no-opener="true"
                        no-referrer="true"
                    >
                        <h2 className="profile-name">{profile.name}</h2>
                    </a>
                    <button className="follow-button">
                        <svg className="follow-button-img icon_sm">
                            <use href={`${sprite}#follow`} />
                        </svg>
                        Follow
                    </button>
                </div>
                <div className="profile-description-body">
                    {profile.bio && (
                        <span className="profile-bio">{profile.bio}</span>
                    )}
                    <ul className="profile-social-media-list my-1">
                        {profile.instagram_username && (
                            <li className="profile-social-media-item">
                                <a
                                    href={
                                        'https://www.instagram.com/' +
                                        profile.instagram_username
                                    }
                                    className="profile-social-media-link"
                                >
                                    <svg className="profile-social-media-icon icon_sm">
                                        <use href={`${sprite}#globe`} />
                                    </svg>{' '}
                                    instagram
                                </a>
                            </li>
                        )}
                        {profile.twitter_username && (
                            <li className="profile-social-media-item">
                                <a
                                    href={
                                        'https://www.twitter.com/' +
                                        profile.twitter_username
                                    }
                                    className="profile-social-media-link"
                                >
                                    <svg className="profile-social-media-icon icon_sm">
                                        <use href={`${sprite}#globe`} />
                                    </svg>{' '}
                                    twitter
                                </a>
                            </li>
                        )}
                    </ul>
                    <div className="profile-stats">
                        <span className="profile-stats-item profile-total-like">
                            <svg className="profile-stats-icon">
                                <use href={`${sprite}#${'_like'}`} />
                            </svg>
                            Likes
                            <span className="stats-count">
                                {profile.total_likes}
                            </span>
                        </span>
                        <span className="profile-stats-item profile-total-photo">
                            <svg className="profile-stats-icon">
                                <use href={`${sprite}#photo`} />
                            </svg>{' '}
                            Photos
                            <span className="stats-count">
                                {profile.total_photos}
                            </span>
                        </span>
                        <span className="profile-stats-item profile-total-downloads">
                            <svg className="profile-stats-icon">
                                <use href={`${sprite}#download-arrow`} />
                            </svg>{' '}
                            Downloads
                            <span className="stats-count">
                                {profile.downloads}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfileContainer.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileContainer;
