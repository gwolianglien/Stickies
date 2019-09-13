import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth: { authenticated, loaded }, ...rest }) => (
    <Route {...rest} render={(props) => (
        authenticated && loaded ?
            <Component {...props} />
            :
            <Redirect to='/' />
    )}/>
)

PrivateRoute.propTypes = {
    authenticated: PropTypes.bool,
    loaded: PropTypes.bool,
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(
    mapStateToProps
)(PrivateRoute);

