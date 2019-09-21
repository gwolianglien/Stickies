import axios from 'axios';
import { setAuthToken } from '../utilities/auth';
import { createAlert } from './alert';
import { 
    createProfile, 
    loadProfile 
} from './profile';
import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOADED,
    LOGOUT,
    CLEAR_PROFILE,
} from './constants';

export const load = () => async dispatch => {

    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: LOADED,
            payload: res.data
        });
        dispatch(loadProfile());
    } catch(err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const login = (user) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(user);
    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(load());
        dispatch(loadProfile());
        dispatch(createAlert('Welcome Back!', 'success'));

    } catch(err) {
        const errors = err.response.data.errors;
        console.log(errors);
        if (errors) {
            errors.forEach(error => dispatch(createAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
}

export const logout = () => async dispatch => {
    dispatch({ 
        type: LOGOUT 
    });
    dispatch({
        type: CLEAR_PROFILE,
    })
    dispatch(createAlert('Thanks for using Stickies!', 'success'));
}

export const register = (user) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify(user);

    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        // Load user once register completes
        dispatch(load());
        dispatch(createProfile());
        dispatch(createAlert('Welcome to Nimbly!', 'success'));

    } catch(err) {
        const errors = err.response.data.errors;
        console.log(errors);
        if (errors) errors.forEach(error => dispatch(createAlert(error.msg, 'danger')));
        dispatch({
            type: REGISTER_FAIL
        });
    }

}