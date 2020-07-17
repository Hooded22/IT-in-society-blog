import React from 'react';
import SideColumn from "../sideColumn";

import "../../css/pageTemplates/headerAndContent.scss";

const PageTemplate = (props) => {
    const {header,content} = props;
    return(
        <div className = "pageTemplate">
            <div className = "header">
                    {header}
            </div>
                <div className = "content">
                    {content}
                    <SideColumn/>
                </div>
        </div>
    )
}

export default PageTemplate;