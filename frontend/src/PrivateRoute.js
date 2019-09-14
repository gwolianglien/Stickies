import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, authenticated, loaded , ...rest }) => (
    <Route {...rest} render={(props) => (
        authenticated && loaded ?
            <Component {...props} />
            :
            <Redirect to='/' />
    )}/>
)

PrivateRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
}

const mapStateToProps = state => (
    { 
        authenticated: state.authenticated,
        loaded: state.loaded,
    }
);

export default connect(
    mapStateToProps
)(PrivateRoute);

