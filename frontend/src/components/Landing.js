import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Login from '../forms/Login';

const Banner = () => (
    <div className="banner">
        <h1>Stickies</h1>
        <p>Keep your notes and reminders organized and up-to-date with Stickies.</p>
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

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

export default connect(mapStateToProps)(Landing);