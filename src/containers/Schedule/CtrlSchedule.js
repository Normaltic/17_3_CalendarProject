import React from 'react';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';

import 'react-datepicker/dist/react-datepicker.css';
import 'rc-time-picker/assets/index.css';

class CtrlSchedule extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            title: '',
            intro: '',
            place: '',
            date: moment(),
            is_share: '',
            users: ''
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    handleChange(e) {
        let nextState = {};

        if( e.target ) nextState[e.target.name] = e.target.value;
        else if ( e._isAMomentObject ) nextState['date'] = e;

        this.setState(nextState);
    }

    handleBack() {
        this.props.history.push('/');
    }

    render() {

        return (

            <div className="ScheduleinputList">

                <button className="waves-effect waves-light btn"
                    onClick={this.handleBack} > {'Back'} </button>

                <input className="input-field" 
                    type="text" 
                    placeholder="Title" 
                    name="title" value={this.state.title}
                    onChange={this.handleChange} />

                <input className="input-field" 
                    type="text" 
                    placeholder="Description" 
                    name="desc" value={this.state.desc}
                    onChange={this.handleChange} />

                <input className="input-field" 
                    type="text" 
                    placeholder="Place" 
                    name="place" value={this.state.place}
                    onChange={this.handleChange} />

                <DatePicker
                    selected={this.state.date}
                    dateFormat="YYYY/MM/DD"
                    onChange={this.handleChange}
                    placeholderText="Date"
                    popperModifiers={{
                        offset: {
                            enable: true,
                            offset: '0px, 0px'
                        }
                    }} />

                <TimePicker
                    value={this.state.date}
                    onChange={this.handleChange} />

            </div>
        )
    }
}

CtrlSchedule.defaultProps = {
    is_edit: false,
    ScheduleData: {
        title: '',
        intro: '',
        place: '',
        date: moment(),
        is_share: '',
        users: '' 
    }
}

export default CtrlSchedule;