import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../reducers';

import SideMenu from '../components/SideMenu/SideMenu';
import SideNav from '../components/SideNav/SideNav';
import HandleBtns from '../components/Button/Buttons';

import './App.css';

class App extends React.Component {

    componentDidMount() {
        $(".button-collapse").sideNav(); 
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.id !== nextProps.id;
    }

    render() {

        const navIcon = (

            <ul id="nav-mobile" className="right navIconSet">
                <li><a href=""><i className="material-icons">lock_open</i></a></li>
                <li><a href=""><i className="material-icons">note_add</i></a></li>

            </ul>
                        
        )

        return (
            <div>
                <nav className="blue lighten-1">
                    <a className="brand-logo">Calendar</a>
                    <a data-activates="side_navigation" className="button-collapse"><i className="material-icons">menu</i></a>

                    {navIcon}

                    <SideNav id="side_navigation"/>
                </nav>
                <div className="row">

                    <SideMenu className="col l3 xl3 hide-on-med-and-down"/>

                    <div className="col s12 m12 l9 xl9 container">
                        <HandleBtns showNextMonth={this.props.handleNextMonth} showPostMonth={this.props.handlePostMonth} />
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    nowDate: state.get('Calendar').get('nowDate')
})
const mapDispatchToProps = (dispatch) => ({
    handleNextMonth: () => dispatch(actions.showNextMonth()),
    handlePostMonth: () => dispatch(actions.showPostMonth())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);