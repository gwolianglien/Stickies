import { CREATE_ALERT, REMOVE_ALERT } from '../actions/constants';

const initialState = [];

export default (currState=initialState, action) => {
    switch(action.type) {
        case CREATE_ALERT:
            return [...currState, action.payload];  // Add new alert to state array 
        case REMOVE_ALERT:
            return currState.filter(alert => alert.id !== action.payload);  // Keep all alert ID's that do not match payload ID
        default:
            return currState;
    }
}
