import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Preloader from '../components/layout/Preloader';
import PhotoCard from '../components/photo/PhotoCard';
import {clearPhoto, getPhoto} from '../actions/photos';

const Photo = ({
    auth,
    photos: {photo, loading},
    clearPhoto,
    getPhoto,
    match,
}) => {
    useEffect(() => {
        getPhoto(match.params.id);
        return () => {
            clearPhoto();
        };
    }, [clearPhoto, getPhoto, match.params.id]);

    useEffect(() => {
        getPhoto(match.params.id);
    }, [auth.isAuthenticated, getPhoto, match.params.id]);

    return loading || photo === null ? (
        <Preloader />
    ) : (
        <PhotoCard photo={photo} extended={true} />
    );
};

Photo.propTypes = {
    auth: PropTypes.object.isRequired,
    photos: PropTypes.object.isRequired,
    clearPhoto: PropTypes.func.isRequired,
    getPhoto: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    photos: state.photos,
});

export default connect(mapStateToProps, {clearPhoto, getPhoto})(Photo);
