import React from 'react';

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

const Home = () => {
    return (
        <div className="app-border app-border-top">
            <Banner />
            <div className="form">
                <StickyForm />
            </div>
            <div className="stickies">
                <Stickies />
            </div>

        </div>
    )
}

export default Home;