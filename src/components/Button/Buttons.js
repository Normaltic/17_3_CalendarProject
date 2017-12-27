import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Buttons extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		let { showPostMonth, showNextMonth, nowDate, groupName = '' } = this.props;

	    return (
	        <div className="row">
				<div className="col s2">
		            <button className="waves-effect waves-loght btn"
	                    onClick={showPostMonth} > {'<'} </button>
				</div>
				<div className="col s1">
					&nbsp;
				</div>
				<div className="col s2">
		            <button className="waves-effect waves-light btn"
        	            onClick={showNextMonth} > {'>'} </button>
				</div>
				<div className="col s3">
					&nbsp;
				</div>
				<div className="col s1">
					{groupName ?
						<Link to="/group/info" className="waves-effect waves-light btn">Info</Link>
						:
						null
					}
				</div>
    	    </div>
	    )
	}
}

const mapStateToProps = (state) => ({
	nowDatee: state.Calendar.get('nowDate')
});

export default connect(mapStateToProps)(Buttons);
