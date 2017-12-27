import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from '../reducers';

import OneWeekItem from '../components/CalendarItem/OneWeekItem'
import './CalendarContainer.css';



class CalendarContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $("#CalendarTable").css({
            height: $(window).height()-155,
            width: '99%'
        })

        $(window).resize( () => {
            $("#CalendarTable").css({
                height: $(window).height()-155
            })
        })
//		this.props.updateGroupList();
    }

    componentWillUpdate() {
        console.warn("Calendar have update");
    }

    render() {
		let groupName = this.props.groupName ? this.props.groupName : '';

        return (
            
            <div className="" id="CalendarTable" >

				<div className="row">
	                <div className="col push-s1">
						{`${this.props.nowDate.year()} - ${this.props.nowDate.month()+1}`}
					</div>
					<div className="col offset-s5">
						<h6>{groupName}</h6>
					</div>
				</div>
                
                {this.props.MonthDataasd.map( (item, i) => {
                    
                    return <OneWeekItem weekItem={item}
                                    key={i} 
                                    weekCount={this.props.MonthDataasd.length}
                                    is_logged_in={this.props.is_logged_in}
                                    handleSelectSchedule={this.props.handleSelectSchedule} />
                })}

            </div>         
        );
    }
}

const mapStateToProps = (state) => ({
    nowDate: state.Calendar.get('nowDate'),
    MonthDataasd: state.Calendar.get('nowMonthData'),
    is_logged_in: state.Auth.get('is_logged_in')
});

export default connect(mapStateToProps)(CalendarContainer);
