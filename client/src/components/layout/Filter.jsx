import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {clearPhotoFilter as clearFilter} from '../../actions/photos';
import './Filter.css';

const Filter = ({filter, clearFilter}) => {
    return (
        filter !== '' && (
            <div className="filter">
                <span className="filter-message">
                    Photos found for "{filter}"
                </span>
                <button className="button" onClick={clearFilter}>
                    Clear
                </button>
            </div>
        )
    );
};

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    clearFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({filter: state.photos.filter});

export default connect(mapStateToProps, {clearFilter})(Filter);
