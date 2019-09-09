import React, { Fragment } from 'react';
import './App.css';

import Provider from 'redux'
import store from './redux';

import Navbar from './components/Navbar';
import Routing from './Routing';

const App = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <Routing />
    </Provider>
  );
}

export default App;
