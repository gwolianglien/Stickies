import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOADED,
    LOGOUT,
} from '../actions/constants';

const initialState = {
    token: localStorage.getItem('token'),
    authenticated: false,
    loaded: false,
    user: null,
}

/*
LOGIN_SUCCESS & REGISTER_SUCCESS  --> one action
LOGOUT & LOGIN_FAIL & REGISTER_FAIL & AUTH_ERROR --> one action
*/
export default (currentState=initialState, action) => {
    switch(action.type) {
        case LOADED:
            return {
                ...currentState,
                user: action.payload,
                authenticated: true,
                loaded: true,
            }
        case REGISTER_SUCCESS:  // Handle register success
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...currentState,
                ...action.payload,
                authenticated: true,
                loaded: true,
            }
        case LOGOUT:  // Handle remove user data cases
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...currentState,
                token: null,
                authenticated: false,
                loaded: true,
            }
        default:
            return currentState;
    }
}
