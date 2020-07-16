import React from 'react'
import {Router} from '@reach/router';

import Categories from "./categories";
import BlogPost from "../modules/blogpost";
import TagPage from "../modules/tagPage";

const App = () => {
    return(
        <Router>
            <Categories path = "/app/categories/:type"/>
            <BlogPost path = "/app/blogpost/:id"/>
            <TagPage path = "/app/tagpage/:tagName"/>
        </Router>
    )
}

export default App;