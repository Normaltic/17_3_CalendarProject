import React from 'react';
import { Link } from 'react-router-dom';

import SideBtn from '../Button/SideBtn';

const SideNav = ( { id } ) => {
    return (

        <ul className="side-nav fixed" id={id}>
            <li><Link to={"/"}><i className="material-icons">search</i>Search</Link></li>
        </ul>

    )
}

export default SideNav;