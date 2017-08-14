import React from 'react';
import { Link } from 'react-router';

import SideBtn from '../Button/SideBtn';

const SideNav = ( { id } ) => {
    return (

        <ul className="side-nav" id={id}>
            <li><Link to={"/"}><i className="material-icons">search</i>Search</Link></li>
        </ul>

    )
}

export default SideNav;