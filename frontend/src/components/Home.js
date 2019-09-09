import React, { Fragment } from 'react';

import Form from '../forms/Form';
import Stickies from './Stickies';

const Home = () => {
    return (
        <Fragment>
            <div className="banner">
                <h1>Home</h1>
            </div>
            <div className="form">
                <Form />
            </div>
            <div className="stickies">
                <Stickies />
            </div>

        </Fragment>
    )
}

export default Home;