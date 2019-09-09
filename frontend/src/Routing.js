import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './components/Landing';
import Register from './forms/Register';
import Home from './components/Home';

const Routing = () => (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/register' component={Register} />
    </Switch>
)

export default Routing;