import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../reducers/Calendar';

import CalendarContainer from './CalendarContainer';
import SideMenu from '../components/SideMenu/SideMenu';
import HandleBtns from '../components/Button/Buttons';
import Modals from '../components/Modal/Modals';
import CtrlSchedule from './Schedule/CtrlSchedule';

import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.handlePostMonth = this.handlePostMonth.bind(this);
    }

    componentDidMount() {
        $(".button-collapse").sideNav();
        if( this.props.is_logged_in ) $("#addSchedule").modal();
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
                {this.props.is_logged_in == 'Success' ? <li><Link to ={"/createSchedule"}><i className="material-icons">note_add</i></Link></li> : null }
            </ul>
                        
        )

        return (

            <div>
                
                <nav className="blue lighten-1">
                    <a className="brand-logo">Calendar</a>
                    <a data-activates="side_nav" className="button-collapse"><i className="material-icons">menu</i></a>
                    {navIcon}
                </nav>

                <SideMenu className="side-nav fixed" id="side_nav"/>

                <div className="row">

                    <div className="Childrens" style={{height: '100%'}}>

                        <Route exact path={this.props.match.url} render={ () => (
                            <div className="" style={{height: '100%'}}>
                                    <HandleBtns showNextMonth={this.handleNextMonth} showPostMonth={this.handlePostMonth} />
                                    <CalendarContainer />
                            </div> )} 
                        />

                        <Route exact path={`/createSchedule`} component={CtrlSchedule} />

                    </div>

                </div>

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