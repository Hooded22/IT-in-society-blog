import React from 'react'
import {Link} from 'gatsby';


const CategoriesBar = () => {
    return(
        <div className = "categories">
             <Link className = "item" to = "/app/categories/Stories">
                <h1>Stories</h1>
            </Link>
            <Link className = "item" to = "/app/categories/Algorithms">
                <h1>Algorithms</h1>
                </Link>
            <Link className = "item" to = "/app/categories/Lifestyle">
                <h1>Lifestyle</h1>
            </Link>
        </div>
    )
}

export default CategoriesBar;