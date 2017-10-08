import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import * as CalendarAction from '../../reducers/Calendar';
import * as ScheduleAction from '../../reducers/Schedule';
import * as service from '../../services/authService';

import CalendarContainer from '../CalendarContainer';
import HandleBtn from '../../components/Button/Buttons';

class GroupCalendar extends React.Component {

    constructor(props) {
        super(props);

        this.handleScheduleView = this.handleScheduleView.bind(this);
        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.handlePostMonth = this.handlePostMonth.bind(this);
    }

    componentWillMount() {
        console.warn(this.props.match.params.groupName);
        this.props.handleMonthGroup(this.props.match.params.groupName, moment());
    }

    componentWillUnmount() {
        let { share, groupList } = this.props.viewOption;
        this.props.handleMonth(moment(), 'Success', share, groupList);
    }

    handleNextMonth() {
        let nowDate = this.props.nowDate;
        nowDate.add(1, 'M');
        this.props.handleMonthGroup(this.props.match.params.groupName, nowDate);
    }

    handlePostMonth() {
        let nowDate = this.props.nowDate;
        nowDate.add(-1, 'M');
        this.props.handleMonthGroup(this.props.match.params.groupName, nowDate);
    }

    handleScheduleView(scheData) {
        this.props.setSelectedSchedule(scheData);
        this.props.history.push('/schedule/view');
    }

    render() {
        return (
            <div>
                <HandleBtn 
                    showNextMonth={this.handleNextMonth} 
                    showPostMonth={this.handlePostMonth} />
                <CalendarContainer 
                    handleSelectSchedule={this.handleScheduleView} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    nowDate: state.Calendar.get('nowDate'),
    nowMonthData: state.Calendar.get('nowMonthData'),
    viewOption: state.Calendar.get('viewOption')
})

const mapDispatchToProps = (dispatch) => ({
    handleMonthGroup: (groupName, date) => dispatch(CalendarAction.handleMonth_Group(groupName, date)),
    handleMonth: (date, is_logged_in, include_shared, groupList) => dispatch(CalendarAction.handleMonth(date, is_logged_in, include_shared, groupList)),
    setSelectedSchedule: (scheduleData) => dispatch(ScheduleAction.selectSchedule(scheduleData))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupCalendar);