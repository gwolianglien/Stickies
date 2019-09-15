import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { updateSticky, removeSticky } from '../actions/profile';

// components
import StickyForm from './StickyForm';
import Sticky from './Sticky';

const Banner = () => {
    return (
        <div className="banner center">
            <h1>Keep Organized.</h1>
        </div>
    )
}

const Home = ({ stickies, updateSticky, removeSticky }) => {
    return (
        <div className="app-border app-border-top">
            <Banner />
            <div className="form">
                <StickyForm />
            </div>
            <div className="stickies">
                <div className="container-fluid row card-columns d-flex flex-wrap">
                    {stickies.map(sticky => {

                        if (!sticky) {
                            return null;
                        }

                        return (
                            <div className="col-md-4" key={`${sticky._id}`}>
                                <Sticky 
                                    details={sticky} 
                                    update={updateSticky}
                                    remove={removeSticky}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

Home.propTypes = {
    stickies: PropTypes.array,
    updateSticky: PropTypes.func.isRequired,
    removeSticky: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ stickies: state.profile.stickies }); 

export default connect(
    mapStateToProps,
    {
        updateSticky,
        removeSticky
    }
)(Home);