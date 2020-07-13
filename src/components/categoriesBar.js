import React from 'react'
import {Link} from 'gatsby';


const CategoriesBar = () => {
    return(
        <div className = "categories">
             <Link className = "item" to = "">
                <h1>Stories</h1>
            </Link>
            <Link className = "item" to = "">
                <h1>Algorythms</h1>
                </Link>
            <Link className = "item" to = "">
                <h1>Lifestyle</h1>
            </Link>
        </div>
    )
}

export default CategoriesBar;