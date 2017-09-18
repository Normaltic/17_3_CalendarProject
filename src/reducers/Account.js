import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

//Define ActionTypes
const ACCDATA_SET = 'account/ACCDATA_SET';

export const setAccData = createAction(ACCDATA_SET); // userID, groupList;

const initialState = Map({
    userID: '',
    groupList: []
})

export default handleActions({
    [ACCDATA_SET]: (state, action) => {
        return state.set('userID', action.payload.userID)
                    .set('groupList', action.payload.groupList);
    }
}, initialState);