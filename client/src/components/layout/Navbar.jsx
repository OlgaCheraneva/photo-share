import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Search from '../layout/Search';
import sprite from '../../svg/sprite.svg';
import {logout} from '../../actions/auth';
import {setAlert} from '../../actions/alert';
import './Navbar.css';

const Navbar = ({auth: {isAuthenticated, loading}, logout, setAlert}) => {
    const onLoginClick = () => {
        fetch('/api/auth/authenticationUrl')
            .then((res) => res.json())
            .then((authenticationUrl) =>
                window.location.assign(authenticationUrl)
            )
            .catch(() =>
                setAlert('Authentication Error. Please try again', 'danger')
            );
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <svg className="logo__image">
                    <use href={`${sprite}#logo`} />
                </svg>
                <h1 className="logo__title">Photo Share</h1>
            </Link>
            {!loading && (
                <Fragment>
                    <div className="search">
                        <Search />
                    </div>
                    {isAuthenticated ? (
                        <Fragment>
                            <Link>
                                <svg className="navbar__user-profile-icon">
                                    <use href={`${sprite}#user`} />
                                </svg>
                            </Link>
                            <button onClick={logout} className="navbar__button">
                                <span className="auth-text">Logout</span>
                                <svg className="auth-icon">
                                    <use href={`${sprite}#logout`} />
                                </svg>
                            </button>
                        </Fragment>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className="navbar__button"
                        >
                            <span className="auth-text">Login</span>
                            <svg className="auth-icon">
                                <use href={`${sprite}#login`} />
                            </svg>
                        </button>
                    )}
                </Fragment>
            )}
        </nav>
    );
};

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
