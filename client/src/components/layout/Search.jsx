import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {setAlert} from '../../actions/alert';
import {setPhotoFilter, clearPhotoFilter} from '../../actions/photos';
import sprite from '../../svg/sprite.svg';
import './Search.css';

const Search = ({setAlert, setPhotoFilter, clearPhotoFilter, history}) => {
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        history.push('/');

        if (text.trim === '') {
            setAlert('Please enter something to search');
        } else {
            setPhotoFilter(text.trim().toLowerCase());
        }
    };

    const onChange = (e) => setText(e.target.value);

    const onClick = () => {
        setText('');
        clearPhotoFilter();
    };

    return (
        <form onSubmit={onSubmit} className="search-form">
            <div className="search-input-group">
                <input
                    className="search-input"
                    type="text"
                    name="text"
                    placeholder="Search Photos..."
                    value={text}
                    onChange={onChange}
                />
                {text !== '' && (
                    <button
                        type="button"
                        className="clear-search-button"
                        onClick={onClick}
                    >
                        <svg className="clear-search-button__icon">
                            <use href={`${sprite}#close`} />
                        </svg>
                    </button>
                )}
            </div>
            <input type="submit" value="Search" className="search-button" />
        </form>
    );
};

Search.propTypes = {
    setAlert: PropTypes.func.isRequired,
    setPhotoFilter: PropTypes.func.isRequired,
    clearPhotoFilter: PropTypes.func.isRequired,
};

export default connect(null, {setAlert, setPhotoFilter, clearPhotoFilter})(
    withRouter(Search)
);
