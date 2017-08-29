import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './SideMenu.css';

class SideMenu extends React.Component {

    componentDidMount() {
        if( this.props.id == "side_menu" ) {
            $("#side_menu").css({
                height: $(window).height() - 64
            })

            $(window).resize(() => {
                $("#side_menu").css({
                    height: $(window).height() - 64
                })
            })
        }
    }

    render() {

        const { className, id } = this.props;

        return (
            <div className={`${className}`} id={id}>
                <h2 className="SideMenu_Logo">Calendar</h2>
                <div className="divider" />
                <ul className="SideMenu_Items">
                    <li><Link to=""><i className="small material-icons">date_range</i><span>Vote</span></Link></li>
                    <li><Link to={"/"}><i className="small material-icons">search</i><span>Search</span></Link></li>
                    <li><Link to=""><i className="small material-icons">group</i><span>Group</span></Link></li>
                </ul>
            </div>

        )
    }
}

export default SideMenu;