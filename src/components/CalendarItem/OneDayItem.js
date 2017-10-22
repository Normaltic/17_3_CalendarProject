import React from 'react';
import moment from 'moment';

import './OneDayItem.css';

class OneDayItem extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            componentKey: `${this.props.is_nowMonth}${this.props.date}`
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        //$('.modal-trigger').leanModal('open');
        if( this.props.is_logged_in == 'Success' ) $('.modal').modal();
    }

    handleClick(index) {
        // console.warn(this.props.dayitem);
        $('.modal').modal('close');
        this.props.handleSelectSchedule(this.props.dayData[index]);
        // console.warn(e);
    }

    render() {

        const spreadSchedule = () => {
            return this.props.dayData.map( (item, i) => (
                // return <li key={i}><a className="modal-trigger" href="#modal1">{item.title}</a></li>
                <li key={i}>{item.title}</li>
            ))
        }

        const spreadScheduleCollections = () => {
            return (
                <ul className="collection" >
                    {
                        this.props.dayData.map( (item, i) => (
                            <li className="collection-item" key={i} name={i} onClick={ () => this.handleClick(i) }>
                                <h4 name={i}>{item.title}</h4>
                                <p className="sche desc" name={i}><i className="DayCollection_Icon material-icons hide-on-med-and-down">description</i>{item.intro}</p>
                                <p className="sche date hide-on-med-and-down"><i className="DayCollection_Icon material-icons">access_time</i>{moment(item.date).format('LLLL')}</p>
                                <p className="sche place hide-on-med-and-down"><i className="DayCollection_Icon material-icons">place</i>{item.place}</p>
                            </li>   
                        ))
                    }
                </ul>
            )
        }

        return (
            <div className={`oneDay`} id="oneDay" style={{height: '100%'}}>
                <div className={`modal-trigger ${this.props.is_nowMonth}` } data-target={this.state.componentKey} style={{height: '100%'}}>
                    <div className={`dayDate ${this.props.is_holiday}`}>{this.props.date}</div>
                    <ul className="eventList">
                        {this.props.is_logged_in == 'Success' ? spreadSchedule() : null}
                        {/*<a className="modal-trigger" data-target="modal1" onClick={this.handleClick}>Fuck</a>*/}
                    </ul>
                </div>
                {this.props.is_logged_in == 'Success'? (
                    <div id={this.state.componentKey} className="modal">
                        <div className="modal-content">
                            {spreadScheduleCollections()}
                        </div>
                    </div>
                ) : null }
            </div>
        )
    }
}

OneDayItem.defaultProps = {
    is_logged_in: '',
    is_nowMonth: false,
    is_holiday: '',
    date: 1,
    dayData: [],
}

export default OneDayItem;