import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../reducers';

import OneWeekItem from '../components/CalendarItem/OneWeekItem'



class CalendarContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $("#CalendarTable").css({
            height: $(window).height()-80
        })

        $(window).resize( () => {
            $("#CalendarTable").css({
                height: $(window).height()-80
            })
        })
    }

    render() {

        return (
            
            <table id="CalendarTable" >
                <tbody>
                    {this.props.MonthDataasd.map( (item, i) => {
                        
                        return <OneWeekItem weekItem={item}
                                        key={i} />
                    })}
                </tbody>
            </table>         
        );
    }
}

const mapStateToProps = (state) => ({
    nowDate: state.get('Calendar').get('nowDate'),
    MonthDataasd: state.get('Calendar').get('nowMonthData')
});

export default connect(mapStateToProps)(CalendarContainer);