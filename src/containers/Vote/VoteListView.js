import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import VoteList from './VoteList';
import VoteItem from './VoteItem';
import CtrlVote from './CtrlVote';

class VoteListView extends React.Component {
    constructor(props) {
        super(props);
        this._selectVote = this._selectVote.bind(this);
    }

    componentWillMount() {
        console.warn("Fuck");
		if( this.props.is_logged_in == 'Success' ) 
	        this.props.setVoteListRequest();
		else {
			Materialize.toast("Please Login", 2500);
			this.props.history.push('/auth');
		}
    }

	componentDidMount() {
		//this.props.updateGroupList();
	}

    _selectVote(voteData) {
        this.props.setNowSelectedVote(voteData);
        this.props.history.push('/voteList/itemView');
    }

    render() {
        return (
            <div>

                <Route exact path={this.props.match.url} render={ ( {match, history} ) => (
                    <VoteList history={history} 
                              match={match}
                              voteList={this.props.voteList}
                              selectVote={this._selectVote} />
                )} />

                <Route path={`${this.props.match.url}/itemView`} render={ ( {history} ) => (
                    <VoteItem history={history} voteData={this.props.nowSelectedVote}
                                setVoteListRequest={this.props.setVoteListRequest} 
                                viewOption={this.props.viewOption} />
                )} />

                <Route path={`${this.props.match.url}/update`} render={ ( {history} ) => (
                    <CtrlVote history={history} voteData={this.props.nowSelectedVote}
                                setVoteListRequest={this.props.setVoteListRequest} />
                )} />

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    voteList: state.Vote.get('voteList'),
    nowSelectedVote: state.Vote.get('nowSelectedVote'),
    viewOption: state.Calendar.get('viewOption')
})



export default connect(mapStateToProps)(VoteListView);
