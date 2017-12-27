import React from 'react';
import { Link } from 'react-router-dom';

class GroupInfoView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {groupData, userID} = this.props;
		return (
			<div className="ScheduleItems">
				<div className="">
					<h2>{groupData.name}</h2>
				</div>
				<div className="ScheduleItem_Divider" />
				<div className="ScheduleItem_Property row">
					<div className="col push-s1 s10">
						Group Master : {groupData.master}
					</div>
				</div>
				<div className="ScheduleItem_Property row">
					<div className="col push-s1 s10">
						Description : {groupData.master}
					</div>
				</div>
				<div className="ScheduleItem_Property row">
					<div className="col push-s1 s10">
						Members :
					</div>
					<div className="col push-s1 s10">
						<ul>
							{groupData.members.map( (item, i) => (
								<li key={i}>{item}</li>
							))}
						</ul>
					</div>
				</div>
				
				<div className="ScheduleItem_Property row">
					<div className="col push-s1 s10">
					{ userID == groupData.master ? 
						<Link to="/group/update" className="pushwaves-effect waves-light btn">Update</Link>
						: null
					}
					</div>
				</div>
			</div>
		)
	}
}

export default GroupInfoView;
