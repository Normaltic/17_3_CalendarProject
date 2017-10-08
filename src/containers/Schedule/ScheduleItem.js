import React from 'react';
import { connect } from 'react-redux';

import './ScheduleItem.css';

const ScheduleItem = (props) => {

    let { itemData, history } = props;

    return (                                                                                                                                                                                                                                                                                                                                       
        <div className="ScheduleItems">
            <button onClick={ () => history.goBack()} >Back</button>
            <div> {`Title : ${itemData.title}`}</div>
            <div className="ScheduleItem_Divider" />
            <div> {`Description : ${itemData.intro}`}</div>
            <div className="ScheduleItem_Divider" />
            <div> {`Place : ${itemData.place}`}</div>
            <div className="ScheduleItem_Divider" />
            <div> {`Date : ${itemData.date}`}</div>
            <div className="ScheduleItem_Divider" />
            {itemData.is_share ? <div> {`Registrant : ${itemData.registrant}`} </div> : null}
        </div>
    )
}

ScheduleItem.defaultProps = {
    is_sche: true
}

const mapStateToProps = (state) => ({
    userID: state.Account.get('userID')
})

export default connect(mapStateToProps)(ScheduleItem);
