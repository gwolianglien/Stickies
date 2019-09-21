import {
    CLEAR_PROFILE,
    PROFILE_LOADED,
} from '../actions/constants';

const initialState = {
    stickies: [],
}

export default (currentState=initialState, action) => {
    switch(action.type) {
        case PROFILE_LOADED:
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
