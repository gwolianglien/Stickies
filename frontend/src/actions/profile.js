import axios from 'axios';

// actions
import { createAlert } from './alert';
import {
    AUTH_ERROR,
    PROFILE_LOADED,
    PROFILE_CREATED,
    CLEAR_PROFILE,
} from './constants';

/* User Profile CRUD Actions */
export const createProfile = () => async dispatch => {
    try {
        const res = await axios.post('/api/profile/create');

        // expected response: array holding users' stickies
        dispatch({
            type: PROFILE_CREATED,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: AUTH_ERROR
        });
        dispatch({
            type: CLEAR_PROFILE
        });
    }
}

export const loadProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/read');

        // expected response: array holding users' stickies
        dispatch({
            type: PROFILE_LOADED,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: AUTH_ERROR
        });
        dispatch({
            type: CLEAR_PROFILE
        });
    }
}


/* Stickies CRUD Actions */
export const postSticky = (sticky) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(sticky);
    try {
        await axios.post('/api/profile/sticky', body, config);
        dispatch(loadProfile());  // reload profile to update stickies
    } catch(err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(createAlert(error.msg, 'danger')));
        }
    }
}

export const updateSticky = (sticky) => async dispatch => {
    const currId = sticky._id;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(sticky);
    try {
        await axios.put(`/api/profile/${currId}`, body, config);
        dispatch(createAlert('Sticky updated!', 'success', 3000));
        dispatch(loadProfile());
    } catch(err) {
        dispatch(createAlert('There was an issue updating your sticky!', 'danger', 3000));
    }
}

export const removeSticky = (sticky) => async dispatch => {
    const currId = sticky._id;
    try {
        await axios.delete(`/api/profile/${currId}`);
        dispatch(createAlert('Sticky removed!', 'warning', 3000));
        dispatch(loadProfile());
    } catch(err) {
        dispatch(createAlert('There was an issue removing your sticky!', 'danger', 3000));
    }
}
