import React from 'react';

import './ScheduleItem.css';

const ScheduleItem = ( { itemData, history } ) => {

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

export default ScheduleItem;