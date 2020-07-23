import React from 'react';
import {Link} from 'gatsby';

import SocialIcons from "./socialIcons";

import "../css/footer.scss";

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
                    Na górę
                </Link>
                <h1>
                    Copyright 2020.
                </h1>
            </div>
        </div>
    )
}

export default Footer;