import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../reducers';

import OneWeekItem from '../components/CalendarItem/OneWeekItem'
import './CalendarContainer.css';



class CalendarContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $("#CalendarTable").css({
            height: $(window).height()-130,
            width: '99%'
        })

        $(window).resize( () => {
            $("#CalendarTable").css({
                height: $(window).height()-130
            })
        })
    }

    render() {

        return (
            
            <div className="containers" id="CalendarTable" >
                
                    {this.props.MonthDataasd.map( (item, i) => {
                        
                        return <OneWeekItem weekItem={item}
                                        key={i} 
                                        weekCount={this.props.MonthDataasd.length}
                                        is_logged_in={this.props.is_logged_in}/>
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