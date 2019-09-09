import React from 'react';
import { Route } from 'react-router-dom';


const PrivateRoute = ({ component: Component, auth: { authenticated, loaded }, ...rest }) => (
    <Route {...rest} render={(props) => (
        authenticated && loaded ?
            <Component {...props} />
            :
            <Redirect to='/' />
    )}/>
)

export default PrivateRoute;
