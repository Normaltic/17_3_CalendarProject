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

import './CtrlSchedule.css';

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
                shareType: scheduleData.users.length ? true : false ,
                users: scheduleData.users,
                groups: scheduleData.groups,
                addUser: '',
                addGroup: ''
            }
        }
        
        this.handleChange = this.handleChange.bind(this);
        this._handleError = this._handleError.bind(this);
        this._handleShareType = this._handleShareType.bind(this);
        this._handleSwitch = this._handleSwitch.bind(this);

        this._handleSchedule = this._handleSchedule.bind(this);
        this._handleCreateVote = this._handleCreateVote.bind(this);

        this._handleSearchUser = this._handleSearchUser.bind(this);
        // this._handleSearchGroup = this._handleSearchGroup.bind(this);
    }

    componentDidMount() {
        // $('.datepicker').pickadate({
        //     selectMonths: true, // Creates a dropdown to control month
        //     selectYears: 15, // Creates a dropdown of 15 years to control year,
        //     today: 'Today',
        //     clear: 'Clear',
        //     close: 'Ok',
        //     closeOnSelect: true, // Close upon selecting a date,
        //     onSet: function(data) {
        //         console.warn(moment(data.select));
        //     }
        // });

        // $('.timepicker').pickatime({
        //     default: 'now', // Set default time: 'now', '1:30AM', '16:30'
        //     fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        //     twelvehour: false, // Use AM/PM or 24-hour format
        //     donetext: 'OK', // text for done-button
        //     cleartext: 'Clear', // text for clear-button
        //     canceltext: 'Cancel', // Text for cancel-button
        //     autoclose: true, // automatic close timepicker
        //     ampmclickable: true, // make AM PM clickable
        //     aftershow: function(){}, //Function for after opening timepicker
        //     onSet: function(data) {
        //         console.warn("Set");
        //     },
        //     onSelect: function(data) {
        //         console.warn("select");
        //     },
        //     onClose: function(data) {
        //         console.warn("close");
        //     },
        //     onChange: function(data) {
        //         console.warn("change");
        //     }
        // });

        $(document).ready(function() {
            $('select').material_select();
        });
    }

    handleChange(e) {
        let nextState = {};
        console.warn(e)

        if( e.target ) nextState[e.target.name] = e.target.value;
        else if ( e._isAMomentObject ) nextState['date'] = e;
        
        console.log(nextState);
        this.setState(nextState);
    }

    _handleShareType(e) {
        let nextState = {
            shareType: e
        }

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
        else if( !this.state.title ) message = "일정의 제목을 입력 해 주세요";
        
        if( message ) {
            Materialize.toast(message, 2500);
            return false;
        }

        return true;
    }

    _handleSchedule() {

        if( !this._handleError() ) return;

        let scheduleData = this.state;

        if( !scheduleData.is_share ) {
            scheduleData.users = [];
            scheduleData.shareType = true;
        }

        scheduleData.date = scheduleData.date.toDate();

        if( this.props.is_create ) {

            if( !scheduleData.shareType ) {
                scheduleData.users = [];
                scheduleData.groups = [scheduleData.addGroup];
            } else scheduleData.groups = [];

            service.createSchedule(scheduleData)
                   .then( (response) => {
                        if( response.data.result ) {
                            let date = moment(scheduleData.date);
                            this.props.handleMonth(date, 'Success', true, this.props.viewOption.groupList);
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
                           let date = moment(scheduleData.date);
                           this.props.handleMonth(date, 'Success', this.props.viewOption.groupList);
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

        let voteData = this.state;

        if( !voteData.shareType ) {
            voteData.users = [];
            voteData.groups = [voteData.addGroup];
        } else voteData.groups = [];

        voteData.date = voteData.date.toDate();
        console.warn(voteData.date);

        service.createVote(voteData)
               .then( (response) => {
                   if( response.data.result ) {
                       Materialize.toast('Success Create Vote', 2500);
                       this.props.history.push('/voteList');
                   } else {
                       console.warn(response.data);
                   }
               })
               .catch( (err) => {
                   console.warn(err);
               });
    }

    _handleSearchUser() {

        if( this.state.users.indexOf(this.state.addUser) != -1 ) {
            Materialize.toast('Already added User');
            this.setState({
                addUser: ''
            })
            return;
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

        const Items = (iconName, inputName, placeholder) => {
            return (
                <div className="CtrlSchedule_inDIV row">
                    <div className="col s1">
                        <i className="inputItemIcon material-icons">{iconName}</i>
                    </div>
                    <div className="col s11">
                        <input className="input-field" 
                            type="text" 
                            placeholder={placeholder} 
                            name={inputName} value={this.state[inputName]}
                            onChange={this.handleChange} />
                    </div>
                </div> 
            )
        }

        return (
        
            <div className="ScheduleinputList">

                <div className="ButtonDIV row">
                    <button onClick={ () => this.props.history.goBack() } 
                            className="col push-s11 pushwaves-effect waves-light btn"> Back </button>
                </div>
                
                {Items('label_outline', 'title', 'Title')}
                {Items('description', 'intro', 'Description')}
                {Items('place', 'place', 'Place')}
                <div className="CtrlSchedule_inDIV row">
                    <div className="col s1">
                        <i className="inputItemIcon material-icons">query_builder</i>
                    </div>
                    <div className="col s11">
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
                    </div>
                </div>
                <div className="CtrlSchedule_inDIV row">
                    <div className="col s1">
                        <br />
                    </div>
                    <div className="col s11">
                        <TimePicker
                            value={this.state.date}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="CtrlSchedule_Divider" />

                <div className="CtrlSchedule_inDIV switch">
                    <label>
                        No
                        <input type="checkbox" checked={this.state.is_share} onChange={this._handleSwitch}/>
                        <span className="lever" ></span>
                        Share
                    </label>
                </div>
                {
                    this.state.is_share ? 
                        (
                            <div>
                                <div className="CtrlSchedule_inDIV">
                                    <form action="#">
                                        <span onClick={ () => this._handleShareType(true)}>
                                            <input name="userID" type="radio" id="userIDRadio"
                                                checked={this.state.shareType}
                                                onChange={() => {}} />
                                            <label>User ID</label>
                                        </span>
                                        <span onClick={ () => this._handleShareType(false)}>
                                            <input name="Group" type="radio" id="GroupRadio" 
                                                checked={!this.state.shareType}
                                                onChange={() => {}} />
                                            <label >Groups</label>
                                        </span>
                                    </form>
                                </div>

                                {
                                    this.state.shareType ?

                                    <div className="CtrlSchedule_inDIV">
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
                                    <select className="CtrlSchedule_inDIV browser-default" name="addGroup" value={this.state.addGroup} onChange={this.handleChange}>
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
                    this.state.is_share && this.props.is_create ?
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
    groupList: state.Account.get('groupList'),
    viewOption: state.Calendar.get('viewOption')
})

const mapDispatchToProps = (dispatch) => ({
    refreshMontheData: (date) => dispatch(CalendarAction.refreshMonthData(date)),
    handleMonth: (date, is_logged_in, include_shared, groupList) => dispatch(CalendarAction.handleMonth(date, is_logged_in, include_shared, groupList))
})


export default connect(mapStateToProps, mapDispatchToProps)(CtrlSchedule);