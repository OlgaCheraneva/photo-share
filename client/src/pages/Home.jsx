import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Preloader from '../components/layout/Preloader';
import DownloadButton from '../components/layout/DownloadButton';
import PhotoList from '../components/photo/PhotoList';
import {getPhotos} from '../actions/photos';
import {setScrolledByY, setDownloadBtnVisibility} from '../actions/app';

const Home = ({
    isDownloadBtnVisible,
    scrolledByY,
    photos,
    loading,
    getPhotos,
    setScrolledByY,
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
            getPhotos();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        getPhotos();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const {scrollHeight, clientHeight} = document.documentElement;
        setDownloadBtnVisibility(scrollHeight === clientHeight);
    }, [photos, setDownloadBtnVisibility]);

    if (loading) {
        return <Preloader />;
    }

    if (photos.length === 0) {
        return <p className="center">No photos to show...</p>;
    }

    return (
        <Fragment>
            <PhotoList photos={photos} />
            {isDownloadBtnVisible && <DownloadButton onClick={getPhotos} />}
        </Fragment>
    );
};

Home.propTypes = {
    getPhotos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    scrolledByY: state.app.scrolledByY,
    isDownloadBtnVisible: state.app.isDownloadBtnVisible,
    photos: state.photos.photos,
    loading: state.photos.loading,
});

export default connect(mapStateToProps, {
    getPhotos,
    setScrolledByY,
    setDownloadBtnVisibility,
})(Home);
