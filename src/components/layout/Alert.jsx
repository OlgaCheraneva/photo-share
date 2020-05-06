import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import './Alert.css';

const Alert = ({alert}) => {
    const [isFadingOut, setFading] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(
            () => setFading(true),
            alert.timeout - 1000
        );
        return () => {
            clearTimeout(timeoutId);
        };
    }, [alert.timeout]);

    const classes = [
        'alert',
        `alert_${alert.type}`,
        isFadingOut ? 'fade-out' : 'fade-in',
    ];

    return <li className={classes.join(' ')}>{alert.message}</li>;
};

Alert.propTypes = {
    alert: PropTypes.object.isRequired,
};

export default Alert;
