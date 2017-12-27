import React from 'react';
import { Route } from 'react-router-dom';

import GroupCalendar from './GroupCalendar';
import GroupCreate from './GroupCreate';
import GroupInfoView from './GroupInfoView';
import GroupUpdate from './GroupUpdate';

import * as services from '../../services/authService';

class GroupView extends React.Component {

    constructor(props) {
        super(props);

		this.handleSetGroupData = this.handleSetGroupData.bind(this);

		this.state = {
			name: '',
			description: '',
			master: '',
			members: []
		}
    }

	componentDidMount() {
		//this.props.updateGroupList();
	}

	handleSetGroupData(groupName) {
		services.getGroupData(groupName)
		.then( (response) => {
			if( response.data.result ) {
				let data = response.data.groupData;
				console.warn(data);
				this.setState({
					name: data.name,
					description: data.description,
					master: data.master,
					members: data.members
				});
			} else {
				console.warn(response.data);
			}
		})
		.catch( (err) => {
			console.warn(err);
		});
	}
	

    render() {
        return (
            <div>

                <Route path={this.props.match.url + "/create"} render={ ({history}) => (
					<GroupCreate history={history}
								 updateGroupList={this.props.updateGroupList}/>
				)} />

                <Route path={this.props.match.url + "/view/:groupName"} render={ ({history, match}) => (
					<GroupCalendar history={history} match={match}
								   setGroupData={this.handleSetGroupData} />
				)} />
				
				<Route path={this.props.match.url + "/info"} render={ ({history, match}) => (
					<GroupInfoView history={history} match={match}
								   groupData={this.state}
								   userID={this.props.userID}/>
				)} />

				<Route path={this.props.match.url + "/update"} render={ ({history, match}) => (
					<GroupUpdate history={history} match={match}
								 groupData={this.state}
								 updateGroupList={this.props.updateGroupList}/>
				)} />
            </div>
        )
    }
}

export default GroupView;
