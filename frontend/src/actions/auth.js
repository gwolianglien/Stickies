import axios from 'axios';
import { setAuthToken } from '../utilities/auth';
import { createAlert } from './alert';
import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOADED,
    LOGOUT,
} from './constants';

export const loadUser = () => async dispatch => {
    
    console.log('load 1');

    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    console.log('load 2');

    try {

        console.log('load 2.5');

        const res = await axios.get('/api/auth');

        console.log('load 3');

        dispatch({
            type: LOADED,
            payload: res.data
        });

        console.log('load 4');

    } catch(err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const login = (user) => async dispatch => {
    const config = {headers: {'Content-Type': 'application/json'}}
    const body = JSON.stringify(user);
    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
        var welcomeMessage = `Welcome back, ${res.payload.first}!`;
        dispatch(createAlert(welcomeMessage, 'success'));

    } catch(err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(createAlert(error.message, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
}

export const logout = () => async dispatch => {
    dispatch({ type: LOGOUT });
    dispatch(createAlert('Thanks for using Stickies!', 'success'));
}

export const register = (user) => async dispatch => {

    const config = {
        headers: {'Content-Type': 'application/json'}
    };
    const body = JSON.stringify(user);

    try {
        
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        // Load user once register completes
        dispatch(loadUser());
        // dispatch(createUserProfile(res.data));
        dispatch(createAlert('Welcome to Nimbly!', 'success'));

    } catch(err) {
        const errors = err.response.data.errors;
        if (errors) errors.forEach(error => dispatch(createAlert(error.message, 'danger')));
        dispatch({
            type: REGISTER_FAIL
        });
    }

}