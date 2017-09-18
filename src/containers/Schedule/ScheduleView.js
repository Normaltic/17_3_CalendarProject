import React from 'react';
import CtrlSchedule from './CtrlSchedule';
import ScheduleItem from './ScheduleItem';

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

                <Route path={`${this.props.match.url}/view`} render={ ( {history} ) => (
                    <ScheduleItem history={history} itemData={this.props.scheduleData} />
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
    scheduleData: state.Schedule.get('nowSelectSchedule')
})

export default connect(mapStateToProps)(ScheduleView);