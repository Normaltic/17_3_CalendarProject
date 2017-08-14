import React from 'react';

class OneDayInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const scheduleli = (sche, key) => {
            return (
                <div key={key}>
                    <h4>{sche.title}</h4>
                    <p>{sche.intro}</p>
                </div>
            )
        }
        return (
            <div id="OneDayList">
                <div>
                    {this.props.dayScheduleData.map( (item, i) => {
                        return scheduleli(item, i);
                    })}
                </div>
            </div>
        )
    }
}

export default OneDayInfo;