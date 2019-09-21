import axios from 'axios';
import { createAlert } from './alert';
import {
    AUTH_ERROR,
    PROFILE_LOADED,
} from './constants';

/* User Profile */
export const createProfile = () => async dispatch => {
    try {
        await axios.post('/api/profile/create');
        dispatch(loadProfile());
    } catch(err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const loadProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/read');
        dispatch({
            type: PROFILE_LOADED,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}


/* Stickies */
export const postSticky = (sticky) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(sticky);
    try {
        await axios.post('/api/profile/sticky', body, config);
        dispatch(loadProfile());
        dispatch(createAlert('Your sticky was added!', 'success', 3000));
    } catch(err) {
        const errors = err.response.data.errors;
        console.log(errors);
        if (errors) {
            errors.forEach(error => dispatch(createAlert(error.msg, 'danger')));
        }
    }
}

export const updateSticky = (sticky) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(sticky);
    try {
        await axios.put(`/api/profile/${sticky._id}`, body, config);
        dispatch(loadProfile());
        dispatch(createAlert('Your sticky was updated!', 'success', 3000));
    } catch(err) {
        dispatch(createAlert('There was an issue updating your sticky!', 'danger', 3000));
    }
}

export const deleteSticky = (sticky) => async dispatch => {
    try {
        await axios.delete(`/api/profile/${sticky._id}`);
        dispatch(loadProfile());
        dispatch(createAlert('Your sticky was removed!', 'success', 3000));
    } catch(err) {
        dispatch(createAlert('There was an issue removing your sticky!', 'danger', 3000));
    }
}