import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Preloader from '../components/layout/Preloader';
import {login} from '../actions/auth';

const Auth = ({login, location, history}) => {
    useEffect(() => {
        login(location.search.split('code=')[1], history);
    }, [login, location.search, history]);

    return <Preloader />;
};

Auth.propTypes = {
    login: PropTypes.func.isRequired,
};

export default connect(null, {login})(withRouter(Auth));
