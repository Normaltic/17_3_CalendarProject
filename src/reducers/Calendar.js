import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import * as service from '../services/authService';

//Define ActionTypes
const NEXTMONTH = 'schedules/NEXTMONTH';
const POSTMONTH = 'schedules/POSTMONTH';

const NEXTMONTH_LOGIN = 'schedules/NEXTMONTH_LOGIN';
const POSTMONTH_LOGIN = 'schedules/POSTMONTH_LOGIN';

//Create Actions
export const showNextMonth = createAction(NEXTMONTH);
export const showPostMonth = createAction(POSTMONTH);

//Define initialState
/*const initialState = Map({
    nowDate: new Date(),
    LastDay: [31,28,31,30,31,30,31,31,30,31,30,31],
    nowMonthData: []
})*/
const setInitialState = () => {

    const date = new Date();
    date.setDate(1);

    const initialState = Map({
        nowDate: date,
        LastDay: [31,28,31,30,31,30,31,31,30,31,30,31],
        nowMonthData: setMonthList(date)
    })

    return initialState;
}

//Thunk
export const handleMonth = (date, addMonth, is_logged_in) => dispatch => {
    //console.warn('handleMonth 1 : ' + date.getMonth());
    date.setMonth(date.getMonth() + addMonth );
    //console.warn('handleMonth 2 : ' + date.getMonth());
    if( is_logged_in == 'Success') { 
        service.getMonthSchedule(true, date.getFullYear(), date.getMonth()+1)
                .then( (response) => {
                    if( response.data.result ) {
                        if( addMonth == 1 ) dispatch(showNextMonth(response.data.data));
                        else dispatch(showPostMonth(response.data.data));
                    }
                })
                .catch( (err) => {
                    console.warn("reducersss : " + err);
                })
    } else {
        if( addMonth == 1 ) dispatch(showNextMonth(undefined));
        else dispatch(showPostMonth(undefined));
    }
}

//MonthData func
const setMonthList = (date, scheduleData = undefined) => {
    let LastDayList = [31,28,31,30,31,30,31,31,30,31,30,31];
    let MonthData = [];
    let DataList = [];
    let month = date.getMonth();
    let postlastDay = month == 0 ? LastDayList[11] : LastDayList[month-1];
    let lastday = LastDayList[month];

    while( MonthData.length < date.getDay() ) {
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
            let key = date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + i ;

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

    [NEXTMONTH]: (state, action) => {
        const postState = state;
        const nextDate = postState.get('nowDate');
        console.warn('handleMonth 3 : ' + nextDate.getMonth());
        //nextDate.setMonth(nextDate.getMonth()+1);

        return state.set('nowDate', nextDate )
                    .set('nowMonthData', setMonthList(nextDate, action.payload));
    },

    [POSTMONTH]: (state, action) => {
        const postState = state;
        const postDate = postState.get('nowDate');
        console.warn('handleMonth 3 : ' + postDate.getMonth());
        //postDate.setMonth(postDate.getMonth()-1);
        console.warn(action.payload);

        return state.set('nowDate', postDate )
                    .set('nowMonthData', setMonthList(postDate, action.payload));
    },

}, setInitialState() );


//--------------------------

class Schedule {
    constructor(props) {
        this.register = '';
        this.title = '';
        this.intro = '';
        this.place = '';
        this.date = '';
        this.is_share = '';
        this.users = '';
        this.mockup = this.mockup.bind(this);
        this.mockup = this.mockup.bind(this);
    }
    
    mockup() {
        let sche = new Schedule();
        sche.register = "normal";
        sche.title = "Mockup Data";
        sche.intro = "Schedule Data for Mockup";
        sche.place = "in your heart";
        sche.date = new Date(2017,6,25);
        sche.is_share = true;
        this.users = ['js_seo','hk_seo'];

        return sche;
    }
}
