import React from 'react';
import moment from 'moment';
import * as service from '../../services/authService';
import { connect } from 'react-redux';

import './ScheduleItem.css';

const ScheduleItem = (props) => {

    let { itemData, history, match, userID, handleMonth } = props;

    const _handleDeleteSchedule = () => {

        service.deleteSchedule(itemData)
                .then( (response) => {
                    if( response.data.result ) {
                        let scheDate = moment(itemData.date);
                        handleMonth(scheDate, 'Success', true, props.viewOption.groupList);
                        Materialize.toast("Success delete Schedule", 2500);
                        history.push('/');
                    } else {
                        console.warn(response.data);
                    }
                })
                .catch( (err) => {
                    console.warn(err);
                })
    }

    const setProperty = (iconName, contents) => {
        return (
            <div className="ScheduleItem_Property row">
                <div className="col s1 offset-s1 IconDIV">
                    <i className="material-icons">{iconName}</i>
                </div>
                <div className="col s10">
                    {contents}
                </div>
            </div>
        )
    }

    const shareInfo = () => (
        <div className="ScheduleItem_Property row">
            <div className="col s1 offset-s1 IconDIV">
                <i className="material-icons">label_outline</i>
            </div>
            <div className="col s10">
                Registrant : {itemData.registrant} <br />
                {
                    itemData.users.length ? 
                    ( <p>Share User : {itemData.users.map( (item, i) => <span key={i}>{item + '  '}</span>) } </p> )
                    : (<p>Share Group : {itemData.groups[0]}</p>)
                }        
            </div>
        </div>
    )

    const DateToString = (date) => {
        let moments = moment(date);
        return moments.format('LLLL');
    }

    return (
        <div className="ScheduleItems">

            <div className="">
                <h2>{itemData.title}</h2>
            </div>

            <div className="ScheduleItem_Divider" />

            {setProperty('place',`Place : ${itemData.place}` )}

            {/*<div className="ScheduleItem_Divider" />*/}

            {setProperty('access_time',`Date : ${DateToString(itemData.date)}` )}

            {/*<div className="ScheduleItem_Divider" />*/}

            {setProperty('description',`Description : ${itemData.intro}` )}

            {itemData.is_share ? shareInfo() : undefined}

            <br /><br /><br /><br />
            {userID == itemData.registrant ? <button className="pushwaves-effect waves-light btn" onClick={ () => history.push('update') }>Update</button> : null}
            {userID == itemData.registrant ? <button className="pushwaves-effect waves-light btn" onClick={ () => _handleDeleteSchedule() }>Delete</button> : null}
            

        </div>
    )
}

ScheduleItem.defaultProps = {
    is_sche: true
}

export default ScheduleItem;
