import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import * as service from '../services/authService';
import moment from 'moment'

//Define ActionTypes
const HANDLEMONTH = 'calendar/HADNLEMONTH';
const HANDLEMONTH_LOGIN = 'calendar/HANDLEMONTH_LOGIN';

const SETVIEWOPTION = 'calendar/SETVIEWOPTION';

const REFRESHMONTHDATA = 'caneldar/REFRESHMONTHDATA';

//Create Actions
export const handleMonthAction = createAction(HANDLEMONTH); // date
export const handleMonth_LoginAction = createAction(HANDLEMONTH_LOGIN); // date, ScheduleList
export const setViewOption = createAction(SETVIEWOPTION); // viewOption { acc, share, groupList }

export const refreshMonthDataAction = createAction(REFRESHMONTHDATA); // ScheduleList

//Define initialState
/*const initialState = Map({
    nowDate: new Date(),
    LastDay: [31,28,31,30,31,30,31,31,30,31,30,31],
    nowMonthData: []
})*/
const setInitialState = () => {

    const date = moment();
    date.date(1);

    const initialState = Map({
        nowDate: date,
        nowMonthData: setMonthList(date),
        viewOption: {
            acc: true,
            share: true,
            groupList: []
        }
    })

    return initialState;
}

//Thunk
export const handleMonth = (date, is_logged_in, include_shared = true, groupList = undefined) => dispatch => {
    if( is_logged_in == 'Success' ) {
        service.getMonthSchedule(include_shared, date.year(), date.month()+1, groupList)
               .then( (response) => {
                   if( response.data.result ) {
                       let scheduleData = response.data.data;
                       dispatch(handleMonth_LoginAction({date, scheduleData}));
                   }
               })
               .catch( (err) => {
                   console.warn("reducers : " + err);
               })
    } else dispatch(handleMonthAction(date));
}

export const setViewOptionAndRefresh = (viewOption, handleMonthOption) => dispatch => {
    
}

// export const refreshMonthData = (date) => dispatch => {
//     service.getMonthSchedule(true, date.year(), date.month()+1 )
//            .then( (response) => {
//                if( response.data.result ) {
//                    let scheduleData = response.data.data;
//                    dispatch(refreshMonthDataAction(scheduleData));
//                }
//            })
//            .catch( (err) => {
//                console.warn("refreshMonthData : " + err );
//            })
// }

export const handleMonth_Group = (groupName, date) => dispatch => {
    service.getGroupMonthSchedule(groupName, date.year(), date.month()+1)
           .then( (response) => {
               if( response.data.result ) {
                   let scheduleData = response.data.data;
                   dispatch(handleMonth_LoginAction({date, scheduleData}));
               }
           })
           .catch( (err) => {
               console.warn("Error : " + err);
           })
}

//MonthData func
const setMonthList = (date, scheduleData = undefined) => {
    let LastDayList = [31,28,31,30,31,30,31,31,30,31,30,31];
    let MonthData = [];
    let DataList = [];
    let month = date.month();
    let postlastDay = month == 0 ? LastDayList[11] : LastDayList[month-1];
    let lastday = LastDayList[month];

    while( MonthData.length < date.day() ) {
        MonthData.unshift({date: postlastDay, data: [], is_nowMonth: false});
        postlastDay--;
    }
    for( let i = 1; i <= lastday; i++ ) {
        let monthD = {
            date: i,
            data: [],
            is_nowMonth: true
        };
        
        if( scheduleData ) {
            let key = date.year() + '-' + ( date.month() + 1 ) + '-' + i ;

            monthD.data = scheduleData[key];
        }
        /*if( month == 5 && i == 25 ) {
            let sche = new Schedule();
            monthD.data = [sche.mockup()];
        }*/
        
        MonthData.push(monthD);
    }
    for( let i = 1; MonthData.length % 7 != 0; i++ ) {
        MonthData.push({date: i, data: [], is_nowMonth: false});
    }
    for( let i = 0; MonthData.length != 0; i++ ) {
        DataList.push(MonthData.splice(0, 7));
    }

    return DataList
}

//Create reducers
export default handleActions({

    [HANDLEMONTH]: (state, action) => {
        return state.set('nowDate', action.payload)
                    .set('nowMonthData', setMonthList(action.payload));
    },

    [HANDLEMONTH_LOGIN]: (state, action) => {
        return state.set('nowDate', action.payload.date)
                    .set('nowMonthData', setMonthList(action.payload.date, action.payload.scheduleData));
    },

    [SETVIEWOPTION]: (state, action) => {
        return state.set('viewOption', action.payload);
    },

    [REFRESHMONTHDATA]: (state, action) => {
        return state.set('nowMonthData', setMonthList(state.get('nowDate'), action.payload));
    }

}, setInitialState() );


//--------------------------
