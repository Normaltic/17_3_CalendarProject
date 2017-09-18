import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const SELECTSCHEDULE = 'schedule/SELECTSCHEDULE';

export const selectSchedule = createAction(SELECTSCHEDULE) // schedule data


const initialState = Map({
    nowSelectSchedule: {}
})

export default handleActions({

    [SELECTSCHEDULE]: (state, action) => {
        return state.set('nowSelectSchedule', action.payload);
    }
}, initialState );