import React from 'react';

import OneDayItem from './OneDayItem';

const OneWeekItem = ( { weekItem } ) => {

    return (
        <tr className="row" id="oneWeek">
            {weekItem.map( (item, i) => {
                return <OneDayItem is_holiday={ i == 0 ? " holiday" : "" }
                                    dayitem={item}
                                    key={i}/>
            })}
        </tr>
    )
}


export default OneWeekItem;