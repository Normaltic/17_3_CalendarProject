import React from 'react';

import './OneDayItem.css';

class OneDayItem extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {

        return (
            <td className={ "oneDay" + this.props.is_holiday} id="oneDay" >
                {this.props.dayitem.date}
            </td>
        )
    }
}

export default OneDayItem;