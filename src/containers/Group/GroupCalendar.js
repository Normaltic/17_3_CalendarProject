import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import * as CalendarAction from '../../reducers/Calendar';
import * as ScheduleAction from '../../reducers/Schedule';
import * as service from '../../services/authService';

import CalendarContainer from '../CalendarContainer';

class GroupCalendar extends React.Component {

    constructor(props) {
        super(props);

        this.handleScheduleView = this.handleScheduleView.bind(this);
    }

    componentWillMount() {
        console.warn(this.props.match.params.groupName);
        this.props.handleMonthGroup(this.props.match.params.groupName, moment());
    }

    componentWillUnmount() {
        // this.props.handleMonth(moment(), 'Success');
    }

    handleScheduleView(scheData) {
        this.props.setSelectedSchedule(scheData);
        this.props.history.push('/schedule/view');
    }

    render() {
        return (
            <CalendarContainer 
                handleSelectSchedule={this.handleScheduleView} />
        )
    }
}

const mapStateToProps = (state) => ({
    nowDate: state.Calendar.get('nowDate'),
    nowMonthData: state.Calendar.get('nowMonthData')
})

const mapDispatchToProps = (dispatch) => ({
    handleMonthGroup: (groupName, date) => dispatch(CalendarAction.handleMonth_Group(groupName, date)),
    handleMonth: (date, is_logged_in, include_shared, groupList) => dispatch(CalendarAction.handleMonth(date, is_logged_in, include_shared, groupList)),
    setSelectedSchedule: (scheduleData) => dispatch(ScheduleAction.selectSchedule(scheduleData))
})

export default connect(undefined, mapDispatchToProps)(GroupCalendar);