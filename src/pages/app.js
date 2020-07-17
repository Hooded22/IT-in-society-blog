import React from 'react'
import {Router} from '@reach/router';

import Categories from "../modules/categories";
import BlogPost from "../modules/blogpost";
import TagPage from "../modules/tagPage";
import SearchResult from "../modules/searchResult";
import LoginSuccessfull from "../modules/loginSuccessfull";

const App = () => {
    return(
        <Router>
            <Categories path = "/app/categories/:type"/>
            <BlogPost path = "/app/blogpost/:id"/>
            <TagPage path = "/app/tagpage/:tagName"/>
            <SearchResult path = "/app/searchresult/:searchTerm" />
            <LoginSuccessfull path = "/app/auth/loginSuccessfull" />
        </Router>
    )
}

export default App;