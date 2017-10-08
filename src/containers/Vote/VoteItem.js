import React from 'react';
import Bars from 'react-bars';
import { connect } from 'react-redux';

import ScheduleItem from '../Schedule/ScheduleItem';

import * as VoteActions from '../../reducers/Vote';

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
    }

    _handleComments() {
        this.props.commitComments(this.props.voteData._id, this.state.commentWriting);
    }

    _handleVote(is_yes) {
        this.props.doVote(this.props.voteData._id, is_yes);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        console.warn(e.target.value);
        this.setState(nextState);
    }

    render() {

        let voteData = this.props.voteData;
        let voteLength = voteData.yes.length + voteData.no.length;
        let YNData = [
            { label: `참여 ${voteData.yes.length}`, value: (100 * voteData.yes.length) / voteLength },
            { label: `불참 ${voteData.no.length}`, value: (100 * voteData.no.length) / voteLength }
        ];

        return (
            <div>
                <ScheduleItem is_sche={false} history={this.props.history} itemData={voteData} />

                <div className="VoteItem_Divider" />

                <Bars data={YNData} makeUppercase={true} showValue={false} />

                <button className="waves-effect waves-light btn" onClick={ () => this._handleVote(true)}>참여</button>
                <button className="waves-effect waves-light btn" onClick={ () => this._handleVote(false)}>불참</button>

                <div className="VoteItem_divider" />

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
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    commitComments: (voteID, comments) => dispatch(VoteActions.commitComments(voteID, comments)),
    doVote: (voteID, is_yes) => dispatch(VoteActions.doVote(voteID, is_yes))
})

export default connect(undefined, mapDispatchToProps)(VoteItem);