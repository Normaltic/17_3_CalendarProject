import React from 'react';

import * as service from '../../services/authService';

import './GroupCreate.css';

class GroupUpdate extends React.Component {
    constructor(props) {
        super(props);

		let groupData = this.props.groupData;
        this.state = {
            name: groupData.name,
            description: groupData.description,
            addmember: '',
            members: groupData.members
        }

        this.handleChange = this.handleChange.bind(this);

        this.findUser = this.findUser.bind(this);
		this.handleSubstrMembers = this.handleSubstrMembers.bind(this);
		this.handleUpdateGroup = this.handleUpdateGroup.bind(this);
		this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        console.log(e.target.value);
        this.setState(nextState);
    }

	handleSubstrMembers(memberID) {
		let membersList = this.state.members;
		membersList.splice(membersList.indexOf(memberID), 1);
		this.setState({
			members: membersList
		});
	}

    findUser() {
        service.SearchAccount(this.state.addmember)
               .then( (response) => {
                   if( response.data.result ) {
                       let memberList = this.state.members;
                       memberList.push(this.state.addmember);
                       this.setState({
                           members: memberList,
                           addmember: ''
                       })
                   } else {
                       Materialize.toast('존재하지 않는 사용자 입니다.', 2500);
                   }
               })
               .catch( (err) => {
                   console.warn(err);
               })
    }

	handleUpdateGroup() {
		let groupData = this.state;
		groupData.addmember = undefined;

		service.updateGroupData(groupData)
			   .then( (response) => {
				   if( response.data.result ) {
					   Materialize.toast("Success Update Group", 2500);
					   this.props.updateGroupList();
					   this.props.history.goBack();
				   } else {
					   console.warn(response.data);
				   }
			   })
			   .catch( (err) => {
				   console.warn(err);
			   });
	}

	handleDeleteGroup() {
		let groupName = this.state.name;

		service.deleteGroup(groupName)
			   .then( (response) => {
				   if( response.data.result ) {
					   Materialize.toast("Success Delete Group", 2500);
					   this.props.updateGroupList();
					   this.props.history.push('/');
				   }
			   })
			   .catch( (err) => {
				   console.warn(err);
			   });
	};

    render() {

        let members = this.state.members;
        console.warn(members);

        return (
            <div className="">

				<div className="row">
					<br /><br /><br /><br /><br />

	                <input className="col push-s1 s10 CtrlGroup_Item input-field"
	                    type="text"
	                    placeholder="Group Name"
						disabled
	                    name="name" value={this.state.name}
	                    onChange={this.handleChange} />
	                <input className="col push-s1 s10 CtrlGroup_Item input-box"
	                    type="text"
	                    placeholder="Description"
    	                name="description" value={this.state.description}
        	            onChange={this.handleChange} />
            	    <input className="col push-s1 s6 CtrlGroup_Item input-field"
	                    type="text"
    	                placeholder="추가 할 유저의 아이디"
        	            name="addmember" value={this.state.addmember}
            	        onChange={this.handleChange} />

                	<button className="CtrlGroup_Item col push-s1 pushwaves-effect waves-light btn" onClick={this.findUser}> add </button>
				</div>

				<div className="row">
					<div className="col push-s1">Add User List</div>
					<ul className="col s3">

    	                {
        	                this.state.members.map( (item, i) => (
            	                <li key={i}><span onClick={ () => this.handleSubstrMembers(item)}>- &nbsp;&nbsp;</span>{item}</li>
	                        ))
    	                }

        	        </ul>
				</div>
				<br /><br /><br /><br />
				<div className="row">
					<button className="col push-s1 pushwaves-effect waves-light btn"
							onClick={this.handleUpdateGroup}>Update</button>
					<button className="col push-s2 pushwaves-effect waves-light btn"
							onClick={this.handleDeleteGroup}>Delete</button>
				</div>

            </div>
        )
    }
}

export default GroupUpdate;
