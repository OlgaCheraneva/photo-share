import React, {useState} from 'react';
import {connect} from 'react-redux';

import {setAlert} from '../../actions/alert';
import {setPhotoFilter} from '../../actions/photos';
import './Search.css';

const Search = ({setAlert, setPhotoFilter}) => {
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (text.trim === '') {
            setAlert('Please enter something to search');
        } else {
            setPhotoFilter(text.trim().toLowerCase());
            setText('');
        }
    };

    const onChange = (e) => setText(e.target.value);

    return (
        <form onSubmit={onSubmit} className="search-form">
            <input
                className="search-input"
                type="text"
                name="text"
                placeholder="Search Photos..."
                value={text}
                onChange={onChange}
            />
            <input
                type="submit"
                value="Search"
                className="button search-button"
            />
        </form>
    );
};

export default connect(null, {setAlert, setPhotoFilter})(Search);
