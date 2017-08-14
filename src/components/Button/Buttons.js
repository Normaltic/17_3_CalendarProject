import React from 'react';

const Buttons = ( { showPostMonth, showNextMonth, children} ) => {

    return (
        <div>
            <button className="waves-effect waves-light btn"
                    onClick={showPostMonth} > {'<'} </button>
            
            <button className="waves-effect waves-light btn"
                    onClick={showNextMonth} > {'>'} </button>
        </div>
    )
}

export default Buttons;