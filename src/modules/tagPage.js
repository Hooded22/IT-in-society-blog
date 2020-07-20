import React, {useEffect, useState} from 'react';
import axios from 'axios'

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsList, {createPostList} from '../components/postsList';
import {SERVER_ADRESS} from "../env/server_variables.env";
import PageTemplate from "../components/pageTemplates/headerAndContent"


const TagPage = (props) => {
    const [postList, setPostList] = useState([]);
    
    useEffect(() => {
        const TAG_NAME = props.tagName;
        getPostByCategory(TAG_NAME);
    },[props.tagName]);
    
    async function getPostByCategory(tagName)
    {
        try {
            const jsonData  = await axios.get(`${SERVER_ADRESS}/posts?tags.tag_name=${tagName}`);
            const postList = createPostList(jsonData);
            setPostList(postList);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <Layout>
            <SEO title={`${props.tagName} tag page`} />
            <PageTemplate
                header = {<h1>Page of tag {props.tagName}</h1>}
                content = {<PostsList data = {postList} pageNumber = {props.pageNumber} link = {`/app/tagpage/${props.tagName}/page/`} postsLimit = {3}/>} 
            />
        </Layout>
    )
}

export default TagPage;