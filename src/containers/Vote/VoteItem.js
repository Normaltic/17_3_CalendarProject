import React from 'react';
import Bars from 'react-bars';
import moment from 'moment';
import { connect } from 'react-redux';

import ScheduleItem from '../Schedule/ScheduleItem';

import * as VoteActions from '../../reducers/Vote';
import * as CalendarActions from '../../reducers/Calendar';
import * as service from '../../services/authService';

import './VoteItem.css';

class VoteItem extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            commentWriting: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this._handleComments = this._handleComments.bind(this);
        this._handleVote = this._handleVote.bind(this);
        this._handleChangeToSchedule = this._handleChangeToSchedule.bind(this);
        this._handleDeleteVote = this._handleDeleteVote.bind(this);
    }

    _handleComments() {
        this.props.commitComments(this.props.voteData._id, this.state.commentWriting);
    }

    _handleVote(is_yes) {
        this.props.doVote(this.props.voteData._id, is_yes);
    }

    _handleChangeToSchedule() {

        service.ChangeSchedule(this.props.voteData)
               .then( (response) => {
                    if( response.data.result ) {
                        let scheDate = moment(this.props.voteData.date);
                        this.props.handleMonth(scheDate, 'Success', true, this.props.viewOption.groupList);
                        Materialize.toast('Success Change Schedule', 2500);
                        this.props.history.push('/');
                    } else {
                        console.warn(err);
                    }
               })
               .catch( (err) => {
                   console.warn(err);
               })
    }

    _handleDeleteVote() {
        service.deleteVote(this.props.voteData._id)
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

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        console.warn(e.target.value);
        this.setState(nextState);
    }

    render() {

        let { history } = this.props;
        let voteData = this.props.voteData;
        let voteLength = voteData.yes.length + voteData.no.length;
        let YNData = [
            { label: `참여 ${voteData.yes.length}`, value: (100 * voteData.yes.length) / voteLength },
            { label: `불참 ${voteData.no.length}`, value: (100 * voteData.no.length) / voteLength }
        ];

        return (
            <div>
                <div className="ButtonDIV row">
                    <button className="col push-s1 pushwaves-effect waves-light btn"
                            onClick={ () => history.push('/voteList/update')}> Update </button>
                    <button className="col push-s2 pushwaves-effect wabes-light btn"
                            onClick={this._handleChangeToSchedule}> Change 2 Schedule </button>
                    <button className="col push-s5 pushwaves-effect wabes-light btn"
                            onClick={this._handleDeleteVote}>Delete</button>
                    <button className="col push-s6 pushwaves-effect waves-light btn"
                            onClick={ () => history.goBack() } > Back </button>
                </div>
                <ScheduleItem is_sche={false} history={this.props.history} itemData={voteData} />

                <div className="VoteItem_Divider" />

                <div className="VoteItem_ItemDiv">
                    <Bars data={YNData} makeUppercase={true} showValue={false} />
                    <button className="waves-effect waves-light btn" onClick={ () => this._handleVote(true)}>참여</button>
                    <button className="waves-effect waves-light btn" onClick={ () => this._handleVote(false)}>불참</button>
                </div>

                <div className="VoteItem_Divider" />

                <div className="VoteItem_ItemDiv">

                    <div>Comments</div>

                    <input className="input-field" 
                        type="text" 
                        placeholder="do Comments" 
                        name="commentWriting" value={this.state.commentWriting}
                        onChange={this.handleChange} />

                    <button className="waves-effect waves-light btn"
                        onClick={this._handleComments} > Comment </button>
                    <table>
                        <thead>
                            <tr>
                                <th>UserID</th>
                                <th>Comment</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                voteData.comment.map( (item, i) => (
                                    <tr key={i}>
                                        <td>{item.writer}</td>
                                        <td>{item.comment}</td> 
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    commitComments: (voteID, comments) => dispatch(VoteActions.commitComments(voteID, comments)),
    doVote: (voteID, is_yes) => dispatch(VoteActions.doVote(voteID, is_yes)),
    handleMonth: (date, is_logged_in, include_shared, groupList) => dispatch(CalendarActions.handleMonth(date, is_logged_in, include_shared, groupList))
})

export default connect(undefined, mapDispatchToProps)(VoteItem);