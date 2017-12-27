import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import moment from 'moment';

import * as services from '../services/authService';

//Define Actions
const SETVOTELIST = 'vote/SETVOTELIST';
const SETNOWSELECTEDVOTE = 'vote/SETNOWSELECTEDVOTE';
const SETINITIALIZE = 'vote/SETINITIALIZE';

export const setVoteList = createAction(SETVOTELIST); // voteList
export const setNowSelectedVote = createAction(SETNOWSELECTEDVOTE); // voteData
export const setInitialize = createAction(SETINITIALIZE);

const initialState = Map({
    voteList: [],
    nowSelectedVote: {}
})

export const setVoteListRequest = () => (dispatch) => {
    return services.getVoteList()
                   .then( (response) => {
                       if( response.data.result ) {
                           dispatch(setVoteList(response.data.voteList));;
                       }
                   })
                   .catch( (err) => {
                       console.warn(err);
                   })
}

export const commitComments = (voteID, comments) => (dispatch) => {
    return services.updateComment(voteID, comments)
                   .then( (response) => {
                       if( response.data.result ) {
                           dispatch(setNowSelectedVote(response.data.voteData));
                       }
                   })
                   .catch( (err) => {
                       console.warn(err);
                   })
}

export const doVote = (voteID, is_yes) => (dispatch) => {
    return services.doVote(voteID, is_yes)
                   .then( (response) => {
                       if( response.data.result ) {
                           dispatch(setNowSelectedVote(response.data.voteData));
                       }
                   })
                   .catch( (err) => {
                       console.warn(err);
                   })
}

export default handleActions({
    [SETVOTELIST]: (state, action) => {
        return state.set('voteList', action.payload.reverse());
    },

    [SETNOWSELECTEDVOTE]: (state, action) => {
        return state.set('nowSelectedVote', action.payload);
    },

	[SETINITIALIZE]: (state, action) => {
		return state.set('voteList': [])
					.set('nowSelectedVote', {});
	}
}, initialState)
