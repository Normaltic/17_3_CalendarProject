import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import * as VoteActions from '../../reducers/Vote';

import './SideMenu.css';

class SideMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { className, id } = this.props;

        return (
            <div className={`${className}`} id={id}>
                <h2 className="SideMenu_Logo" >Calendar</h2>
                <div className="SideMenu_Divider" />
                <ul className="SideMenu_Items">
                    <li><NavLink to={""}><i className="small material-icons">home</i><span>Home</span></NavLink></li>
                    <li><NavLink onClick={this.props.setVoteListRequest} to={"/voteList"} activeClassName="active"><i className="small material-icons">date_range</i><span>Vote</span></NavLink></li>
                    <li><NavLink to={"/createSchedule"} activeClassName="active"><i className="small material-icons">search</i><span>Search</span></NavLink></li>
                    <li><NavLink to={""} ><i className="small material-icons">group</i><span>Group</span></NavLink></li>

                    {
                        this.props.groupList.map( (item,i) => (
                            <li key={i}><NavLink to={`/group/view/${item}`} >{item}</NavLink></li>
                        ))
                    }

                    <li><NavLink to={'/group/create'}><i className="small material-icons">add</i></NavLink></li>
                </ul>
            </div>

        )
    }
}

export default SideMenu;