import React from 'react';

import OneDayItem from './OneDayItem';
import './OneWeekItem.css';

const OneWeekItem = ( { weekItem, weekCount, is_logged_in } ) => {

    return (
        <div className="row" id="oneWeek" style={{height: `${100 / weekCount}%`, width: '100%', display: 'flex'}}>
            {weekItem.map( (item, i) => {
                return <OneDayItem is_holiday={ i == 0 ? " holiday" : "" }
                                    date={item.date}
                                    dayData={item.data}
                                    is_logged_in={is_logged_in}
                                    is_nowMonth={item.is_nowMonth}
                                    key={i}/>
            })}
        </div>
    )
}


export default OneWeekItem;