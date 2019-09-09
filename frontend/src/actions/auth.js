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

export const load = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: LOADED,
            data: res.data
        });
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
            data: res.data
        });
        dispatch(load());
        var welcomeMessage = `Welcome back, ${res.data.first}!`;
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
    const config = {header: {'Content-Type': 'application/json'}}
    const body = JSON.stringify(user);
    try {
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            data: res.data
        });

        // Load user once register completes
        dispatch(load());
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