import React, { useEffect } from 'react';
import './App.css';

import {Provider} from 'react-redux'
import store from './redux';
import { setAuthToken } from './utilities/auth';
import { loadUser } from './actions/auth';

import Navbar from './components/Navbar';
import Routing from './Routing';
import Alert from './components/Alert';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    if (localStorage.token) store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <Alert />
        <Routing />
      </div>
    </Provider>
  );
}

export default App;
