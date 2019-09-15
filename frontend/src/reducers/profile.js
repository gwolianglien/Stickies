import {
    CLEAR_PROFILE,
    PROFILE_CREATED,
    PROFILE_LOADED,
    PROFILE_UPDATED,
} from '../actions/constants';

const initialState = {
    stickies: [],
}

export default (currentState=initialState, action) => {
    switch(action.type) {
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
