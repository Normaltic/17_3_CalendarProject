import React from 'react';
import { connect } from 'react-redux';
//import './SideMenu.css';


class SideMenu extends React.Component {

    componentDidMount() {
        $("#side-menu").css({
            height: $(window).height() - 64
        })
    }

    render() {

        $(window).resize(() => {
            $("#side-menu").css({
                height: $(window).height() - 64
            })
        })

        return (
            <div className={this.props.className + " blue lighten-4"} id="side-menu">
                fucking Side menu
                
            </div>
        )
    }
}


export default SideMenu;