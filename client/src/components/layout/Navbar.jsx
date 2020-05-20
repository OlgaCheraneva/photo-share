import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {logout} from '../../actions/auth';
import {setAlert} from '../../actions/alert';
import sprite from '../../svg/sprite.svg';
import './Navbar.css';

const Navbar = ({auth: {isAuthenticated, loading}, logout, setAlert}) => (
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
                        fetch('/api/auth/authenticationUrl')
                            .then((res) => res.json())
                            .then((authenticationUrl) =>
                                window.location.assign(authenticationUrl)
                            )
                            .catch(() =>
                                setAlert(
                                    'Authentication Error. Please try again',
                                    'danger'
                                )
                            );
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
    setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {logout, setAlert})(Navbar);
