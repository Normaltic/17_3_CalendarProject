import React from 'react';

import './OneDayItem.css';

class OneDayItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            componentKey: `${this.props.is_nowMonth}${this.props.date}`
        }
    }

    componentDidMount() {
        //$('.modal-trigger').leanModal('open');
        if( this.props.is_logged_in ) $('.modal').modal();
    }

    handleClick() {
        // console.warn(this.props.dayitem);

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
                <ul className="collection">
                    {
                        this.props.dayData.map( (item, i) => (
                            <li className="collection-item" key={i}>
                                <h4>{item.title}</h4>
                                <p className="sche-desc">{item.intro}</p>
                            </li>   
                        ))
                    }
                </ul>
            )
        }

        return (
            <div className={`oneDay`} id="oneDay" style={{height: '100%'}}>

                <div className={`modal-trigger ${this.props.is_nowMonth}` } data-target={this.state.componentKey} onClick={this.handleClick} style={{height: '100%'}}>
                    <div className={`dayDate ${this.props.is_holiday}`}>{this.props.date}</div>
                    <ul className="eventList">
                        {this.props.is_logged_in ? spreadSchedule() : null}
                        {/*<a className="modal-trigger" data-target="modal1" onClick={this.handleClick}>Fuck</a>*/}
                    </ul>
                </div>
                {this.props.is_logged_in ? (
                    <div id={this.state.componentKey} className="modal">
                        <div className="modal-content">
                            {this.state.componentKey}
                            {spreadScheduleCollections()}
                        </div>
                        <div className="modal-footer">
                            <a href="" className="modal-action modal-close waves-effect waves-green btn-flat "> - </a>
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