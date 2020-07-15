import React from 'react';
import {Link} from 'gatsby';

import SocialIcons from "./socialIcons";

import "../css/footer.css";

const Footer = () => {
    return(
        <div className = "footer">
            <div className = "top">
                 <SocialIcons
                    color = "#000"
                    size = {21}
                    width = "70%"
                 />
            </div>
            <div className = "bottom">
                <Link className = "onTopButton" to = "#">
                    On top
                </Link>
                <h6>
                    Copyright 2020.
                </h6>
            </div>
        </div>
    )
}

export default Footer;