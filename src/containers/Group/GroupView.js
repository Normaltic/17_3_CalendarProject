import React from 'react';
import { Route } from 'react-router-dom';

import GroupCalendar from './GroupCalendar';
import GroupCreate from './GroupCreate';

class GroupView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <Route path={`${this.props.match.url}/create`} render={ () => (
                    <GroupCreate />
                )} />

                <Route path={`${this.props.match.url}/view/:groupName`} component={GroupCalendar} />
            </div>
        )
    }
}

export default GroupView;