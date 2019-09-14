import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Login from './Login';

const Banner = () => (
    <div className="banner">
        <h1>Stickies</h1>
        <p>
            Your Post-It Notes reimagined. Digitalized. Oh, and upgraded.
        </p>
    </div>
)

const Landing = ({ authenticated }) => {

    if (authenticated) {
        return <Redirect to='/home' />
    }

    return (
        <Fragment>
            <Banner />
            <Login />
        </Fragment>
    )
}

Landing.propTypes = {
    authenticated: PropTypes.bool
}

const mapStateToProps = state => (
    { 
        authenticated: state.authenticated 
    }
);

export default connect(
    mapStateToProps
)(Landing);