import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
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
    authenticated: PropTypes.bool,
    loaded: PropTypes.bool,
}

const mapStateToProps = state => (
    { 
        authenticated: state.user.authenticated,
        loaded: state.user.loaded,
    }
);

export default withRouter(connect(
    mapStateToProps
)(PrivateRoute));

