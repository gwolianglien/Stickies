import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => alert !== null && alerts.map(alert => {
    return (
        <div key={alert.id} className={`alert alert-${alert.border} overlay`} role="alert">
            {alert.message}
        </div>
    )
});

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({ alerts: state.alert });

export default connect(
    mapStateToProps
)(Alert);
