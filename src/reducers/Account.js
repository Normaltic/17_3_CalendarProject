import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import * as service from '../services/authService';

//Define ActionTypes
const ACCDATA_SET = 'account/ACCDATA_SET';
const ACCDATA_INITIALIZE = 'account/ACCDATA_INITIALIZE';
const ACCDATA_GROUPLISTUPDATE = 'account/ACCDATA_GROUPLISTUPDATE';

export const setAccData = createAction(ACCDATA_SET); // userID, groupList;
export const setInitialize = createAction(ACCDATA_INITIALIZE);
export const Acc_updateGroupList = createAction(ACCDATA_GROUPLISTUPDATE);

export const updateGroupList = () => dispatch => {
	service.updateGroupList()
	.then( (response) => {
		if( response.data.result ) {
			let { groupList } = response.data;
			dispatch(Acc_updateGroupList(groupList));
		} else {
			console.warn("not update");
		}
	})
	.catch( (err) => {
		console.warn(err);
	});
};


const initialState = Map({
    userID: '',
    groupList: []
})


export default handleActions({
    [ACCDATA_SET]: (state, action) => {
        return state.set('userID', action.payload.userID)
                    .set('groupList', action.payload.groupList);
    },

	[ACCDATA_INITIALIZE]: (state, action) => {
		return state.set('userID', '')
					.set('groupList', []);
	},

	[ACCDATA_GROUPLISTUPDATE]: (state, action) => {
		return state.set('groupList', action.payload);
	}
}, initialState);
