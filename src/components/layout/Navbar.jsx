import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {authenticationUrl} from '../../unsplash';
import {logout} from '../../actions/auth';
import sprite from '../../sprite.svg';
import './Navbar.css';

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => (
    <nav className="navbar">
        <Link to="/" className="logo">
            <svg className="logo__image">
                <use href={`${sprite}#logo`} />
            </svg>
            <h1 className="logo__title">Photo Share</h1>
        </Link>
        {!loading &&
            (isAuthenticated ? (
                <button onClick={logout} className="navbar__button">
                    Logout
                </button>
            ) : (
                <button
                    onClick={() => {
                        window.location.assign(authenticationUrl);
                    }}
                    className="navbar__button"
                >
                    Login
                </button>
            ))}
    </nav>
);

Navbar.propTypes = {
    auth: PropTypes.shape({
        isAuthenticated: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
    }),
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {logout})(Navbar);
