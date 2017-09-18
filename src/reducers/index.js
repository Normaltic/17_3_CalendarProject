import { combineReducers } from 'redux';

import Calendar from './Calendar';
import Auth from './Auth';
import Schedule from './Schedule';
import Vote from './Vote';
import Account from './Account';

const reducers = combineReducers({
    Calendar,
    Auth,
    Account,
    Schedule,
    Vote
})

export default reducers