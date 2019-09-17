import axios from 'axios';
import { createAlert } from './alert';
import {
    AUTH_ERROR,
    PROFILE_LOADED,
    PROFILE_CREATED,
    STICKY_CREATED,
    STICKY_UPDATED,
} from './constants';

/* User Profile */
export const createProfile = () => async dispatch => {
    try {
        const res = await axios.post('/api/profile/create');
        dispatch({
            type: PROFILE_CREATED,
            payload: res.data
        });
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
        const res = await axios.post('/api/profile/sticky', body, config);

        // expected: payload contains new Sticky object
        dispatch({
            type: STICKY_CREATED,
            payload: res.data,  
        });

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
    const currId = sticky._id;
    try {
        const res = await axios.put(`/api/profile/${currId}`, body, config);

        // expected: payload contains updated Sticky object
        dispatch({
            type: STICKY_UPDATED,
            payload: res.data
        });

    } catch(err) {
        dispatch(
            createAlert(
                'There was an issue updating your sticky!', 
                'danger'
            )
        );
    }
}