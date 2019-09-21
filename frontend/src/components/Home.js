import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import StickyForm from './StickyForm';
import Sticky from './Sticky';
import { updateSticky, deleteSticky } from '../actions/profile';

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

const Home = ({ stickies, updateSticky, deleteSticky }) => {
    return (
        <div className="app-border app-border-top">
            <Banner />
            <div className="form">
                <StickyForm />
            </div>
            {stickies.length > 0 ?
                <div className="container-fluid row card-columns d-flex flex-wrap">
                    {stickies.map(sticky => {
                        return (
                            <Sticky 
                                current={sticky} 
                                update={updateSticky}
                                delete={deleteSticky}
                            />
                        )
                    })}
                </div>
                :
                null
            }
        </div>
    )
}

const mapStateToProps = state => ({ stickies: state.profile.stickies });

Home.propTypes = {
    stickies: PropTypes.array,
    deleteSticky: PropTypes.func.isRequired,
    updateSticky: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    {
        deleteSticky,
        updateSticky
    }
)(Home);