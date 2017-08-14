import { combineReducers } from 'redux';

import Calendar from './Calendar';
import Auth from './Auth'

const reducers = combineReducers({
    Calendar,
    Auth
})

export default reducers