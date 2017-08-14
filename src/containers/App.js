import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../reducers/Calendar';

import SideMenu from '../components/SideMenu/SideMenu';
import SideNav from '../components/SideNav/SideNav';
import HandleBtns from '../components/Button/Buttons';
import Modals from '../components/Modal/Modals';

import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.handlePostMonth = this.handlePostMonth.bind(this);
    }

    componentDidMount() {
        $(".button-collapse").sideNav();
        if( this.props.is_logged_in ) $(".addModal-trigger").leanModal();
    }

    /*shouldComponentUpdate(nextProps, nextState) {
        return this.props.id !== nextProps.id;
    }*/

    handleNextMonth() {
        let { nowDate, is_logged_in } = this.props;
        this.props.handleMonthAction(nowDate, 1, is_logged_in);
    }
    handlePostMonth() {
        let { nowDate, is_logged_in } = this.props;
        this.props.handleMonthAction(nowDate, -1, is_logged_in);
    }

    render() {

        const is_logged_in = this.props.is_logged_in == 'Success' ? true : false ;

        const navIcon = (

            <ul id="nav-mobile" className="right navIconSet">
                <li><Link to={"/auth"}><i className="material-icons">{ is_logged_in ? "lock_outline" : "lock_open" }</i></Link></li>
                <li><a className="addModal-trigger" data-target="addSchedule"><i className="material-icons">note_add</i></a></li>

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

                    <div className="col s12 m12 l9 xl9 container" style={{height: '100%'}}>
                        <HandleBtns showNextMonth={this.handleNextMonth} showPostMonth={this.handlePostMonth} />
                        {this.props.children}
                    </div>
                </div>
                {
                    this.props.is_logged_in ? (
                        <Modals classname="modal" componentKey="addSchedule" />
                    ) : null 
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    nowDate: state.Calendar.get('nowDate'),
    is_logged_in: state.Auth.get('is_logged_in')
})
const mapDispatchToProps = (dispatch) => ({
    handleMonthAction: (date, addMonth, is_logged_in) => dispatch(actions.handleMonth(date, addMonth, is_logged_in))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);