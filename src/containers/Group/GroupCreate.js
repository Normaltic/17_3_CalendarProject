import React from 'react';

import * as service from '../../services/authService';

class GroupCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            addmember: '',
            members: []
        }

        this.handleChange = this.handleChange.bind(this);

        this.findUser = this.findUser.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        console.log(e.target.value);
        this.setState(nextState);
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

    render() {

        let members = this.state.members;
        console.warn(members);

        return (
            <div>
                <input className="input-field"
                    type="text"
                    placeholder="Group Name"
                    name="name" value={this.state.name}
                    onChange={this.handleChange} />
                <input className="input-box"
                    type="text"
                    placeholder="Description"
                    name="description" value={this.state.description}
                    onChange={this.handleChange} />
                <input className="input-field"
                    type="text"
                    placeholder="추가 할 유저의 아이디"
                    name="addmember" value={this.state.addmember}
                    onChange={this.handleChange} />
                <button onClick={this.findUser}> add </button>
                <ul>

                    {
                        this.state.members.map( (item, i) => (
                            <li key={i}>{item}</li>
                        ))
                    }

                </ul>
            </div>
        )
    }
}

export default GroupCreate;