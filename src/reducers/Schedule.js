import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const SELECTSCHEDULE = 'schedule/SELECTSCHEDULE';
const SETINITIALIZE = 'schedule/SETINITIALIZE';

export const selectSchedule = createAction(SELECTSCHEDULE) // schedule data
export const setInitialize = createAction(SETINITIALIZE);


const initialState = Map({
    nowSelectSchedule: {}
})

export default handleActions({

    [SELECTSCHEDULE]: (state, action) => {
        return state.set('nowSelectSchedule', action.payload);
    },

	[SETINITIALIZE]: (state, action) => {
		return state.set('nowSelectSchedule', {});
	}
}, initialState );
