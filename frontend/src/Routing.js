import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Landing from './components/Landing';
import Register from './components/Register';
import Home from './components/Home';
import NotFound from './components/NotFound';

const Routing = () => (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/home' component={Home} />
        <Route component={NotFound} />
    </Switch>
)

export default Routing;