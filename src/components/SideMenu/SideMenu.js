import React from 'react';
import { connect } from 'react-redux';

import SideBtn from '../Button/SideBtn'


class SideMenu extends React.Component {

    componentDidMount() {
        $("#side-menu").css({
            height: $(window).height() - 64
        })

        $(window).resize(() => {
            $("#side-menu").css({
                height: $(window).height() - 64
            })
        })
    }

    render() {

        
        return (
            <div className={this.props.className + " blue lighten-4"} id="side-menu">
                <p>fucking Side menu</p>
                <SideBtn />                
            </div>
        )
    }
}


export default SideMenu;