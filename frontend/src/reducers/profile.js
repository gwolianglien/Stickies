import {
    CLEAR_PROFILE,
    PROFILE_CREATED,
    PROFILE_LOADED,
    PROFILE_UPDATED,
    STICKY_CREATED,
} from '../actions/constants';

const initialState = {
    stickies: [],
}

export default (currentState=initialState, action) => {
    switch(action.type) {
        case STICKY_CREATED:
            return {
                stickies: currentState.stickies.unshift(action.payload)
            }
        case PROFILE_UPDATED:
        case PROFILE_LOADED:
        case PROFILE_CREATED:
            return {
                stickies: action.payload
            }
        case CLEAR_PROFILE:
            return {
                stickies: []
            }
        default:
            return currentState;
    }
}
