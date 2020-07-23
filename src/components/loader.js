import React from 'react';

import "../css/loader.css";



const Loader = (props) => {
    return(
        <div className = "loader">
            <div className="lds-dual-ring"></div>
            <h1>{props.text}</h1>
        </div>
    )
}

export default Loader;