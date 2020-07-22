import React from 'react'
import {Router} from '@reach/router';

import Categories from "../modules/categories";
import BlogPost from "../modules/blogpost";
import TagPage from "../modules/tagPage";
import SearchResult from "../modules/searchResult";
import LoginSuccessfull from "../modules/loginSuccessfull";
import IndexPage from "../pages/index";
import UpdateComment from "../modules/updateComment"

const App = () => {
    return(
        <Router>
            <IndexPage path = "/app/page/:pageNumber"/>
            <Categories path = "/app/categories/:type/page/:pageNumber"/>
            <Categories path = "/app/categories/:type"/>
            <BlogPost path = "/app/blogpost/:id"/>
            <TagPage path = "/app/tagpage/:tagName/page/:pageNumber"/>
            <TagPage path = "/app/tagpage/:tagName"/>
            <SearchResult path = "/app/searchresult/:searchTerm/page/:pageNumber" />
            <SearchResult path = "/app/searchresult/:searchTerm" />
            <LoginSuccessfull path = "/app/auth/loginSuccessfull" />
            <UpdateComment path ="/app/updatecomment/:commentId/:email/:username/:previousPostId/:token" />
        </Router>
    )
}

export default App;