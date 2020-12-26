import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    clearUserProfile,
    getUserProfile,
    getUserPhotos,
} from '../actions/profile';
import ProfileContainer from '../components/profile/ProfileContainer';
import PhotoList from '../components/photo/PhotoList';
import DownloadButton from '../components/layout/DownloadButton';
import Preloader from '../components/layout/Preloader';
import {setScrolledByY, setDownloadBtnVisibility} from '../actions/app';

const Profile = ({
    profile,
    getUserProfile,
    scrolledByY,
    clearUserProfile,
    match,
    setScrolledByY,
    getUserPhotos,
    isDownloadBtnVisible,
    setDownloadBtnVisibility,
}) => {
    const getAvailableForScrolling = () => {
        const {scrollHeight, clientHeight} = document.documentElement;

        return scrollHeight - clientHeight;
    };

    const isScrolledDownToTheEnd = () => {
        const availableForScrolling = getAvailableForScrolling();
        const scrolled = window.scrollY;
        const thresholdDifferenceInPx = 1;

        if (
            availableForScrolling - scrolled < thresholdDifferenceInPx &&
            scrolledByY < scrolled
        ) {
            setScrolledByY(scrolled);
            return true;
        }

        return false;
    };

    const handleScroll = () => {
        if (isScrolledDownToTheEnd()) {
            getUserPhotos(match.params.username);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const {scrollHeight, clientHeight} = document.documentElement;
        setDownloadBtnVisibility(scrollHeight === clientHeight);
    }, [profile.photos, setDownloadBtnVisibility]);

    useEffect(() => {
        getUserProfile(match.params.username);

        return () => {
            clearUserProfile();
        };
    }, [getUserProfile, clearUserProfile, match.params.username]);

    return profile.loading || profile.profile === null ? (
        <Preloader />
    ) : (
        <Fragment>
            <ProfileContainer />
            {profile.photos.length !== 0 ? (
                <Fragment>
                    <PhotoList photos={profile.photos} />
                    {isDownloadBtnVisible && (
                        <DownloadButton
                            onClick={() => getUserPhotos(match.params.username)}
                        />
                    )}
                </Fragment>
            ) : (
                <div>
                    <img
                        src="/no-photos.png"
                        alt="No photos yet"
                        title="No photos yet"
                        className="profile-no-photos-img"
                    />
                </div>
            )}
        </Fragment>
    );
};

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    clearUserProfile: PropTypes.func.isRequired,
    getUserProfile: PropTypes.func.isRequired,
    getUserPhotos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    scrolledByY: state.app.scrolledByY,
    isDownloadBtnVisible: state.app.isDownloadBtnVisible,
});

export default connect(mapStateToProps, {
    clearUserProfile,
    getUserProfile,
    getUserPhotos,
})(Profile);
