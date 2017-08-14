import React from 'react';
import { Link } from 'react-router';

const SideBtn = ( {className = '', id = ''} ) => {

    return (
        <ul className={`SideBtnList ${className}`} id={id}>

            <li className="Search">
                <Link to={"/"}>
                    <i className="material-icons">search</i> Search
                </Link>
            </li>

        </ul>
    )
}

export default SideBtn