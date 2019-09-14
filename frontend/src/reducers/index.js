import { combineReducers } from 'redux';

import alert from './alert';
import user from './user';
import profile from './profile';

export default combineReducers({
    alert,
    user,
    profile
});