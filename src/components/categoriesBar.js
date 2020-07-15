import React from 'react'
import {Link} from 'gatsby';


const CategoriesBar = () => {
    return(
        <div className = "categories">
             <Link className = "item" to = "/app/categories/stories">
                <h1>Stories</h1>
            </Link>
            <Link className = "item" to = "/app/categories/algorithms">
                <h1>Algorithms</h1>
                </Link>
            <Link className = "item" to = "/app/categories/lifestyle">
                <h1>Lifestyle</h1>
            </Link>
        </div>
    )
}

export default CategoriesBar;