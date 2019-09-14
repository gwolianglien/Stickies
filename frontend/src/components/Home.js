import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import StickyForm from './StickyForm';
import Stickies from './Stickies';

const Banner = () => {
    return (
        <div className="banner">
            <h1>Stickies</h1>
            <p>
                Keep organized. Stay on top.
            </p>
        </div>
    )
}

const Home = ({ stickies }) => {
    return (
        <div className="app-border app-border-top">
            <Banner />
            <div className="form">
                <StickyForm />
            </div>
            <div className="stickies">
                <Stickies 
                    myStickies={stickies}
                />
            </div>

        </div>
    )
}

Home.propTypes = {
    stickies: PropTypes.array
}

const mapStateToProps = state => (
    { 
        stickies: state.stickies 
    }
);

export default connect(
    mapStateToProps
)(Home);