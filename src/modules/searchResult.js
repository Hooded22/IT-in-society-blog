import React, {useEffect, useState} from 'react';
import axios from 'axios'

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsList, {createPostList} from '../components/postsList';
import {SERVER_ADRESS} from "../env/server_variables.env";
import PageTemplate from "../components/pageTemplates/headerAndContent"

const EmptySearchResult = (props) => (
    <div>
        <p>No result for "{props.searchTerm}"</p>
    </div>
)


const SearchResult = (props) => {
    const [postList, setPostList] = useState(null);
    
    useEffect(() => {
        const SEARCH_TERM = props.searchTerm;
        getPostByTitle(SEARCH_TERM);
    },[props.searchTerm]);
    
    async function getPostByTitle(searchTerm)
    {
        try {
            const jsonData  = await axios.get(`${SERVER_ADRESS}/posts?Title_contains=${searchTerm}`);
            if(jsonData.data.length !== 0)
            {
                const postList = createPostList(jsonData);
                setPostList(postList);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <Layout>
            <SEO title={`${props.searchTerm} tag page`} />
            <PageTemplate
                header = {<h1>Search result for: "{props.searchTerm}"</h1>}
                content = {postList == null ? <EmptySearchResult searchTerm = {props.searchTerm}/> :<PostsList data = {postList}/>} 
            />
        </Layout>
    )
}

export default SearchResult;