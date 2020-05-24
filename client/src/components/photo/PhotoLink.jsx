import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const PhotoLink = ({photo, sourceLink, children}) =>
    sourceLink ? (
        <a href={photo.links.html} target="_blank" rel="noreferrer noopener">
            {children}
        </a>
    ) : (
        <Link to={`/photos/${photo.id}`}>{children}</Link>
    );

PhotoLink.propTypes = {
    photo: PropTypes.object.isRequired,
    sourceLink: PropTypes.bool.isRequired,
};

export default PhotoLink;
