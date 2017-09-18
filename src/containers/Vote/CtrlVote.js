import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as service from '../../services/authService';
import * as CalendarAction from '../../reducers/Calendar';

import 'react-datepicker/dist/react-datepicker.css';
import 'rc-time-picker/assets/index.css';

class CtrlVote extends React.Component {

    constructor(props) {
        super(props);

        let voteData = this.props.voteData;

        this.state = {
            _id: voteData._id,
            title: voteData.title,
            intro: voteData.intro,
            place: voteData.place,
            registrant: voteData.registrant,
            date: moment(voteData.date),
            is_share: voteData.is_share,
            users: voteData.users
        }
        
        this.handleChange = this.handleChange.bind(this);
        this._handleVote = this._handleVote.bind(this);
    }

    handleChange(e) {
        let nextState = {};

        if( e.target ) nextState[e.target.name] = e.target.value;
        else if ( e._isAMomentObject ) nextState['date'] = e;

        this.setState(nextState);
    }

    _handleVote() {

    }

    render() {

        return (

            <div className="VoteinputList">

                <Link className="waves-effect waves-light btn" to={'/'}> Back </Link>

                <input className="input-field" 
                    type="text" 
                    placeholder="Title" 
                    name="title" value={this.state.title}
                    onChange={this.handleChange} />

                <input className="input-field" 
                    type="text" 
                    placeholder="Description" 
                    name="intro" value={this.state.intro}
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

CtrlVote.defaultProps = {
    
}

const mapDispatchToProps = (dispatch) => ({
    
})


export default connect(undefined, mapDispatchToProps)(CtrlVote);