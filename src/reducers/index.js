import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

//Define ActionTypes
const NEXTMONTH = 'schedules/NEXTMONTH';
const POSTMONTH = 'schedules/POSTMONTH';

//Create Actions
export const showNextMonth = createAction(NEXTMONTH);
export const showPostMonth = createAction(POSTMONTH);

//Define initialState
const initialState = Map({
    Calendar: Map({
        nowDate: new Date(),
        LastDay: [31,28,31,30,31,30,31,31,30,31,30,31],
        nowMonthData: []
    })
})

//MonthData func
const setMonthList = (date) => {
    let LastDayList = [31,28,31,30,31,30,31,31,30,31,30,31];
    let MonthData = [];
    let DataList = [];

    let month = date.getMonth();
    let postlastDay = month == 0 ? LastDayList[11] : LastDayList[month-1];
    let lastday = LastDayList[month];

    while( MonthData.length < date.getDay() ) {
        MonthData.unshift({date: postlastDay, is_nowMonth: false});
        postlastDay--;
    }
    for( let i = 1; i <= lastday; i++ ) {
        MonthData.push({date: i});
    }
    for( let i = 1; MonthData.length < 42; i++ ) {
        MonthData.push({date: i, is_nowMonth: false});
    }
    for( let i = 0; i < 7; i++ ) {
        DataList.push(MonthData.splice(0, 7));
    }

    return DataList
}

const setInitialState = () => {

    const date = new Date();
    date.setDate(1);

    const initialState = Map({
        Calendar: Map({
            nowDate: date,
            LastDay: [31,28,31,30,31,30,31,31,30,31,30,31],
            nowMonthData: setMonthList(date)
        })
    })
    return initialState;
}

//Create reducers
export default handleActions({
    [NEXTMONTH]: (state, action) => {
        const postState = state.get('Calendar');
        const nextDate = postState.get('nowDate');
        nextDate.setMonth(nextDate.getMonth()+1);

        return state.set('Calendar',  
                postState.set('nowDate', nextDate )
                         .set('nowMonthData', setMonthList(nextDate))
                );
    },
    [POSTMONTH]: (state, action) => {
        const postState = state.get('Calendar');
        const postDate = postState.get('nowDate');
        postDate.setMonth(postDate.getMonth()-1);

        return state.set('Calendar',
                postState.set('nowDate;', postDate )
                         .set('nowMonthData', setMonthList(postDate))
                );
    }

}, setInitialState() );