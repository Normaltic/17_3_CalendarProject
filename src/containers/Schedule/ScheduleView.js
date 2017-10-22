import React from 'react';
import CtrlSchedule from './CtrlSchedule';
import ScheduleItem from './ScheduleItem';
import * as CalendarActions from '../../reducers/Calendar';

import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';

class ScheduleView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        
    }

    render() {

        return (
            <div>

                <Route path={`${this.props.match.url}/view`} render={ ( {history, match} ) => (
                    <div>
                        <div className="ButtonDIV row">
                            <button onClick={ () => history.goBack() } 
                                    className="col push-s11 pushwaves-effect waves-light btn"> Back </button>
                        </div>
                        <ScheduleItem history={history} itemData={this.props.scheduleData} userID={this.props.userID} 
                                        handleMonth={this.props.handleMonth}
                                        viewOption={this.props.viewOption} />
                    </div>
                )} />

                <Route path={`${this.props.match.url}/create`} render={ ( {history} ) => (
                    <CtrlSchedule history={history} />
                )} />

                <Route path={`${this.props.match.url}/update`} render={ ( {history} ) => (
                    <CtrlSchedule history={history} is_create={false} scheduleData={this.props.scheduleData} />
                )} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    scheduleData: state.Schedule.get('nowSelectSchedule'),
    userID: state.Account.get('userID'),
    viewOption: state.Calendar.get('viewOption')
})

const mapDispatchToProps = (dispatch) => ({
    handleMonth: (date, is_logged_in, include_shared, groupList) => dispatch(CalendarActions.handleMonth(date, is_logged_in, include_shared, groupList))
});

export default connect(mapStateToProps,mapDispatchToProps)(ScheduleView);