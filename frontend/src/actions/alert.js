import uuid from 'uuid';
import { CREATE_ALERT, REMOVE_ALERT } from './constants';

export const createAlert = (message, border, timeout = 5000) => dispatch => {
    const id = uuid.v4(); 
    dispatch({
        type: CREATE_ALERT,
        data: {
            id,
            message,
            border,
        }
    });

    setTimeout(() => dispatch({ 
        type: REMOVE_ALERT, 
        data: id 
    }), timeout);
}
