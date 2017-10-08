import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as CalendarActions from '../reducers/Calendar';
import * as ScheduleActions from '../reducers/Schedule';
import * as VoteActions from '../reducers/Vote';

import CalendarContainer from './CalendarContainer';
import SideMenu from '../components/SideMenu/SideMenu';
import HandleBtns from '../components/Button/Buttons';
import Modals from '../components/Modal/Modals';
import ScheduleView from './Schedule/ScheduleView';
import GroupView from './Group/GroupView';
import CtrlSchedule from './Schedule/CtrlSchedule';
import VoteListView from './Vote/VoteListView';


import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.handlePostMonth = this.handlePostMonth.bind(this);
        this.handleScheduleView = this.handleScheduleView.bind(this);
    }

    componentDidMount() {
        $(".button-collapse").sideNav({
            closeOnClick: true
        });
        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
            stopPropagation: false // Stops event propagation
            }
        );
        
    }

    /*shouldComponentUpdate(nextProps, nextState) {
        return this.props.id !== nextProps.id;
    }*/

    handleNextMonth() {
        let { nowDate, is_logged_in, viewOption } = this.props;
        nowDate.add(1, 'M');
        console.warn(nowDate);
        this.props.handleMonthAction(nowDate, is_logged_in, viewOption.share, viewOption.groupList);
    }
    handlePostMonth() {
        let { nowDate, is_logged_in, viewOption } = this.props;
        nowDate.add(-1, 'M');
        console.warn(nowDate);
        this.props.handleMonthAction(nowDate, is_logged_in, viewOption.share, viewOption.groupList);
    }

    handleScheduleView(scheData) {
        this.props.setSelectedSchedule(scheData);
        this.props.history.push('/schedule/view');
    }

    render() {

        const is_logged_in = this.props.is_logged_in == 'Success' ? true : false ;

        const navIcon = (

            <ul id="nav-mobile" className="right navIconSet">
                <li><Link to={"/auth"}><i className="material-icons">{ is_logged_in ? "lock_outline" : "lock_open" }</i></Link></li>
                {this.props.is_logged_in == 'Success' ? <li><Link to ={"/schedule/create"}><i className="material-icons">note_add</i></Link></li> : null }
                {this.props.is_logged_in == 'Success' ? <a className='dropdown-button btn' href='#' data-activates='dropdown1'>Drop Me!</a> : null}
                  <ul id='dropdown1' className='dropdown-content'>
                    <li><a href="#!">one</a></li>
                    <li><a href="#!">two</a></li>
                    <li className="divider"></li>
                    <li><a href="#!">three</a></li>
                    <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
                    <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
                </ul>
            </ul>
                        
        )

        return (

            <div>
                <nav className="asd">
                    <a className="brand-logo">Calendar</a>
                    <a data-activates="side_nav" className="button-collapse"><i className="material-icons">menu</i></a>
                    {navIcon}
                </nav>

                <SideMenu className="side-nav fixed" id="side_nav"
                          groupList={this.props.groupList}
                          setVoteListRequest={this.props.setVoteListRequest}
                          handleClose={this.handleSideMenuClose}  />

                <div className="row">

                    <div className="Childrens grey lighten-5" style={{height: '100%'}}>

                        <Route exact path={this.props.match.url} render={ () => (
                            <div className="" style={{height: '100%'}}>
                                    <HandleBtns showNextMonth={this.handleNextMonth} showPostMonth={this.handlePostMonth} />
                                    <CalendarContainer handleSelectSchedule={this.handleScheduleView}/>
                            </div> 
                        )} />

                        <Route path={`${this.props.match.url}schedule`} render={ ( {match, history} ) => (
                            <ScheduleView match={match} history={history} />
                        )} />

                        <Route path={`${this.props.match.url}voteList`} render={ ( {match, history} ) => (
                            <VoteListView 
                                setVoteListRequest={this.props.setVoteListRequest} 
                                setNowSelectedVote={this.props.setNowSelectedVote}
                                match={match} history={history} />
                        )} />

                        <Route path={`${this.props.match.url}group`} render={ ( {match, history} ) => (
                            <GroupView match={match} history={history} />
                        )} />

                    </div>

                </div>

            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    nowDate: state.Calendar.get('nowDate'),
    is_logged_in: state.Auth.get('is_logged_in'),
    userID: state.Account.get('userID'),
    groupList: state.Account.get('groupList'),
    viewOption: state.Calendar.get('viewOption')
})

const mapDispatchToProps = (dispatch) => ({
    handleMonthAction: (date, is_logged_in, include_shared, groupList) => dispatch(CalendarActions.handleMonth(date, is_logged_in, include_shared, groupList)),
    setSelectedSchedule: (scheduleData) => dispatch(ScheduleActions.selectSchedule(scheduleData)),
    setVoteListRequest: () => dispatch(VoteActions.setVoteListRequest()),
    setNowSelectedVote: (voteData) => dispatch(VoteActions.setNowSelectedVote(voteData))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);