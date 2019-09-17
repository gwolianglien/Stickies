import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import Login from './Login';

const Banner = () => (
    <div className="banner center">
        <h1>Stickies</h1>
        <p>
            Your Post-It Notes. Reimagined, Digitalized, and oh, Upgraded.
        </p>
    </div>
)

const Landing = ({ authenticated }) => {

    if (authenticated) {
        return <Redirect to='/home' />
    }

    return (
        <div className="app-border app-border-top">
            { console.log(authenticated)}
            <Banner />
            <Login />
        </div>
    )
}

Landing.propTypes = {
    authenticated: PropTypes.bool
}

const mapStateToProps = state => (
    { 
        authenticated: state.user.authenticated 
    }
);

export default withRouter(connect(
    mapStateToProps
)(Landing));