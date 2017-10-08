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

class CtrlSchedule extends React.Component {

    constructor(props) {
        super(props);



        if( this.props.is_create ) {
            this.state = {
                title: '',
                intro: '',
                place: '',
                date: moment(),
                is_share: '',
                shareType: true,
                users: [],
                groups: '',
                addUser: '',
                addGroup: '',
                fuck: ''
            }
        } else {
            let scheduleData = this.props.scheduleData;
            this.state = {
                _id: scheduleData._id,
                title: scheduleData.title,
                intro: scheduleData.intro,
                place: scheduleData.place,
                registrant: scheduleData.registrant,
                date: moment(scheduleData.date),
                is_share: scheduleData.is_share,
                shareType: scheduleData.users ? true : false ,
                users: scheduleData.users,
                groups: scheduleData.groups,
                addUser: '',
                addGroup: ''
            }
        }
        
        this.handleChange = this.handleChange.bind(this);
        this._handleError = this._handleError.bind(this);
        this._handleSwitch = this._handleSwitch.bind(this);

        this._handleSchedule = this._handleSchedule.bind(this);
        this._handleCreateVote = this._handleCreateVote.bind(this);

        this._handleSearchUser = this._handleSearchUser.bind(this);
        // this._handleSearchGroup = this._handleSearchGroup.bind(this);
    }

    componentDidMount() {
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: true, // Close upon selecting a date,
            onSelect: function(data) {
                console.warn(data);
            }
        });
        $(document).ready(function() {
            $('select').material_select();
        });
    }

    handleChange(e) {
        let nextState = {};

        if( e.target ) nextState[e.target.name] = e.target.value;
        else if ( e._isAMomentObject ) nextState['date'] = e;
        
        console.log(nextState);
        this.setState(nextState);
    }

    _handleSwitch() {
        this.setState({
            is_share: !this.state.is_share
        })
    }

    _handleError() {
        let message = '';
        if( this.state.is_share && !this.state.users.length && !this.state.addGroup ) message = "공유할 대상을 추가 해 주세요";
        
        if( message ) {
            Materialize.toast(message, 2500);
            return false;
        }

        return true;
    }

    _handleSchedule() {

        if( !this._handleError() ) return;

        let scheduleData = this.state;

        if( this.props.is_create ) {

            if( !this.state.shareType ) {
                scheduleData.users = [];
                scheduleData.groups = [scheduleData.addGroup];
            }

            service.createSchedule(scheduleData)
                   .then( (response) => {
                        if( response.data.result ) {
                            this.props.handleMonth(this.state.date, 'Success');
                            Materialize.toast('Success Create Schedule', 2500);
                            this.props.history.push('/');
                        } else {
                            console.warn(response.data);
                        }
                    })
                    .catch( (err) => {
                        console.warn(err);
                    })
        } else {
            service.updateSchedule(scheduleData)
                   .then( (response) => {
                       if( response.data.result ) {
                           this.props.handleMonth(this.state.date, 'Success');
                           Materialize.toast('Success Update Schedule', 2500);
                           this.props.history.push('/');
                       } else {
                           console.warn(response.data);
                       }
                   })
                   .catch( (err) => {
                       console.warn(err);
                   })
        }
    }

    _handleCreateVote() {

        if( !this._handleError() ) return;

    }

    _handleSearchUser() {
        for( let userID in this.state.users ) {
            if( userID == this.state.addUser ) {
                Materialize.toast('Already added User');
                this.setState({
                    addUser: ''
                })
                return;
            }
        }
        service.SearchAccount(this.state.addUser)
                .then( (response) => {
                    if( response.data.result ) {
                        let { users, addUser } = this.state;
                        Materialize.toast('Success add User', 2500);
                        users.push(addUser);
                        this.setState({
                            addUser: '',
                            users: users
                        })
                    } else {
                        console.warn(response.data);
                    }
                })
                .catch( (err) => {
                    console.warn(err);
                })
    }

    render() {

        return (
            

            <div className="ScheduleinputList">

                <button onClick={ () => this.props.history.goBack() } className="waves-effect waves-light btn"> Back </button>

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

                <div className="switch">
                    <label>
                        No
                        <input type="checkbox" onClick={this._handleSwitch}/>
                        <span className="lever" ></span>
                        Share
                    </label>
                </div>

                <input type="text" className="datepicker" name="fuck" value={this.state.fuck} onChange={this.handleChange} />
                {
                    this.state.is_share ? 
                        (
                            <div>

                                <form action="">
                                    <span onClick={ () => this.setState({shareType: true}) }>
                                        <input name="userID" type="radio" id="userIDRadio" checked={this.state.shareType}/>
                                        <label >User ID</label>
                                    </span>
                                    <span onClick={ () => this.setState({shareType: false})}>
                                        <input name="Group" type="radio" id="GroupRadio" checked={!this.state.shareType}/>
                                        <label >Groups</label>
                                    </span>
                                </form>

                                {
                                    this.state.shareType ?

                                    <div>
                                        <input className="input-field" 
                                            type="text" 
                                            placeholder="Type add User ID" 
                                            name="addUser" value={this.state.addUser}
                                            onChange={this.handleChange} />
                                        <button onClick={this._handleSearchUser}> add </button>
                                        <ul>
                                            {
                                                this.state.users.map( (item, i) => (
                                                    <li key={i}>{item}</li>       
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    :     
                                    <select className="browser-default" name="addGroup" value={this.state.addGroup} onChange={this.handleChange}>
                                        <option value="">Choose your option</option>
                                        {
                                            this.props.groupList.map( (item, i) => (
                                                <option key={i} value={item}>{item}</option>
                                            ))
                                        }
                                    </select>
                                }
                                <br />
                            </div>
                        ) 
                    : null
                }

                <button className="waves-effect waves-light btn"
                    onClick={this._handleSchedule} > { this.props.is_create ? 'Create' : 'Update' } </button>
                {
                    this.state.is_share ?
                        <button className="waves-effect waves-light btn"
                            onClick={this._handleCreateVote}> Vote </button>
                        : null
                }
            </div>
        )
    }
}

CtrlSchedule.defaultProps = {
    is_create: true,
    ScheduleData: {
        _id: '',
        title: '',
        intro: '',
        place: '',
        date: moment(),
        is_share: false,
        users: ''
    }
}

const mapStateToProps = (state) => ({
    groupList: state.Account.get('groupList')
})

const mapDispatchToProps = (dispatch) => ({
    refreshMontheData: (date) => dispatch(CalendarAction.refreshMonthData(date)),
    handleMonth: (date, is_logged_in) => dispatch(CalendarAction.handleMonth(date, is_logged_in))
})


export default connect(mapStateToProps, mapDispatchToProps)(CtrlSchedule);