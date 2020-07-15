import React from 'react'
import {Router} from '@reach/router';

import Categories from "./categories"
import BlogPost from "../modules/blogpost"

const App = () => {
    return(
        <Router>
            <Categories path = "/app/categories/:type"/>
            <BlogPost path = "/app/blogpost/:id"/>
        </Router>
    )
}

export default App;