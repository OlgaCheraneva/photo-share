import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Alert from './Alert';
import './Alerts.css';

const Alerts = ({alerts}) =>
    alerts.length > 0 && (
        <ul className="alerts">
            {alerts.map((alert) => (
                <Alert key={alert.id} alert={alert} />
            ))}
        </ul>
    );

Alerts.propTypes = {
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({alerts: state.alert});

export default connect(mapStateToProps)(Alerts);
