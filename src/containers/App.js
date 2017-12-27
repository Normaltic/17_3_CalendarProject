import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as AccountActions from '../reducers/Account';
import * as AuthAction from '../reducers/Auth';
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

		this.groupUpdateFlag = false;

        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.handlePostMonth = this.handlePostMonth.bind(this);
        this.handleScheduleView = this.handleScheduleView.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleUpdateGroupList = this.handleUpdateGroupList.bind(this);
    }

	componentWillMount() {
	}

	componentWillReceiveProps(nextProps) {
	}

    componentDidMount() {
        $(".button-collapse").sideNav({
            closeOnClick: true
        });
		const handling = () => {
			if( this.props.is_logged_in ) this.props.updateGroupList();
			setTimeout(handling.bind(this), 1000*9);
		};

		handling();
    }

    /*shouldComponentUpdate(nextProps, nextState) {
        return this.props.id !== nextProps.id;
    }*/
	handleUpdateGroupList() {
	}

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

	handleLogout() {
		this.props.LogoutAction();
		Materialize.toast("Success to Logout", 2500);
	}

    render() {

        const is_logged_in = this.props.is_logged_in == 'Success' ? true : false ;

        const navIcon = (

            <ul id="nav-mobile" className="right navIconSet">
                <li>
				{
					is_logged_in ? 
					<Link to="/"><i className="material-icons"onClick={this.handleLogout}>lock_outline</i></Link>
					:
					<Link to="/auth"><i className="material-icons">lock_open</i></Link>
				}
				</li>
                {this.props.is_logged_in == 'Success' ? <li><Link to ={"/schedule/create"}><i className="material-icons">note_add</i></Link></li> : null }
                  <ul id='dropdown1' className='dropdown-content'>
                    <li>>one</li>
                    <li>two</li>
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

                    <div className="Childrens" style={{width: '100%', height: '100%'}}>

                        <Route exact path={this.props.match.url} render={ () => {
							return (
	                            <div className="" style={{width: '100%', height: '100%'}}>
    	                                <HandleBtns showNextMonth={this.handleNextMonth} showPostMonth={this.handlePostMonth} nowDate={this.props.nowDate} />
        	                            <CalendarContainer handleSelectSchedule={this.handleScheduleView}
															updateGroupList={this.props.updateGroupList} />
            	                </div> 
                	        )}} />

                        <Route path={`${this.props.match.url}schedule`} render={ ( {match, history} ) => {
							return (
                            	<ScheduleView match={match} history={history} updateGroupList={this.props.updateGroupList}/>
                        	)}} />

                        <Route path={`${this.props.match.url}voteList`} render={ ( {match, history} ) => {
							return (
	                            <VoteListView 
    	                            setVoteListRequest={this.props.setVoteListRequest} 
        	                        setNowSelectedVote={this.props.setNowSelectedVote}
									updateGroupList={this.props.updateGroupList}
									is_logged_in={this.props.is_logged_in}
            	                    match={match} history={history} />
                	        )}} />

                        <Route path={`${this.props.match.url}group`} render={ ( {match, history} ) => {
							return (
                            	<GroupView match={match} history={history}
									updateGroupList={this.props.updateGroupList}
									userID={this.props.userID} />
                       		)}} />

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
    setNowSelectedVote: (voteData) => dispatch(VoteActions.setNowSelectedVote(voteData)),
	updateGroupList: () => dispatch(AccountActions.updateGroupList()),
	LogoutAction: () => dispatch(AuthAction.LogoutAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
