import React, { useEffect } from 'react';
import './App.css';

import { Provider } from 'react-redux'
import store from './redux';
import { setAuthToken } from './utilities/auth';
import { load } from './actions/user';

import Navbar from './components/Navbar';
import Routing from './Routing';
import Alert from './components/Alert';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    if (localStorage.token) store.dispatch(load());
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
