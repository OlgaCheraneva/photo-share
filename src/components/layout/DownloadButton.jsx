import React from 'react';
import PropTypes from 'prop-types';

const DownloadButton = ({onClick}) => {
    return (
        <button className="button" onClick={onClick}>
            Load More
        </button>
    );
};

DownloadButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default DownloadButton;
