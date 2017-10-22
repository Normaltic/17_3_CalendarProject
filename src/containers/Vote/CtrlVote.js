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

import './CtrlVote.css';

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
            shareType: voteData.users.length ? true : false,
            users: voteData.users,
            groups: voteData.groups,
            addUser: '',
            addGroup: '',
            commentWriter: [],
            commentContent: [],
            comment: [],
            yes: [],
            no: []
        }
        
        this.handleChange = this.handleChange.bind(this);
        this._handleError = this._handleError.bind(this);
        this._handleUpdateVote = this._handleUpdateVote.bind(this);

    }

    componentDidMount() {

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

    _handleUpdateVote() {
        if( !this._handleError() ) return;

        service.updateVote(this.state)
               .then( (response) => {
                   if( response.data.result ) {
                       this.props.setVoteListRequest();
                       Materialize.toast("Success to Update", 2500);
                       this.props.history.push('/voteList');
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
                <div className="CtrlVote_inDIV row">
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
                <div className="CtrlVote_inDIV row">
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
                <div className="CtrlVote_inDIV row">
                    <div className="col s1">
                        <br />
                    </div>
                    <div className="col s11">
                        <TimePicker
                            value={this.state.date}
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="CtrlVote_Divider" />

                <div className="CtrlVote_inDIV switch">
                    <label>
                        No
                        <input type="checkbox" disabled checked={this.state.is_share} />
                        <span className="lever" ></span>
                        Share
                    </label>
                </div>
                <div>
                    <div className="CtrlVote_inDIV">
                        <form action="#">
                            <span onClick={ () => {}}>
                                <input name="userID" type="radio" id="userIDRadio"
                                    disabled
                                    checked={this.state.shareType}
                                    onChange={() => {}} />
                                <label>User ID</label>
                            </span>
                            <span onClick={ () => {}}>
                                <input name="Group" type="radio" id="GroupRadio" 
                                    disabled
                                    checked={!this.state.shareType}
                                    onChange={() => {}} />
                                <label >Groups</label>
                            </span>
                        </form>
                    </div>

                    {
                        this.state.shareType ?
                        <ul>
                            <li>Share User : </li>
                            {
                                this.state.users.map( (item, i) => (
                                    <li key={i}>{item}</li>       
                                ))
                            }
                        </ul>
                        :     
                        <p>Share Group : {this.state.groups[0]}</p>
                    }
                    <br /><br /><br /><br /><br />
                </div>

                <button className="pushwaves-effect waves-light btn"
                        onClick={this._handleUpdateVote}> Update </button>

            </div>
        )
    }
}

CtrlVote.defaultProps = {
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

export default CtrlVote;