import React, {useEffect, useState} from 'react';
import axios from 'axios'

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsList, {createPostList} from '../components/postsList';
import {SERVER_ADRESS} from "../env/server_variables.env";
import PageTemplate from "../components/pageTemplates/headerAndContent";

const Categories = (props) => {
    const [postList, setPostList] = useState([]);
    
    useEffect(() => {
        const CATEGORY_NAME = props.type;
        getPostByCategory(CATEGORY_NAME);
    },[props.type]);
    
    async function getPostByCategory(category)
    {
        try {
            const jsonData  = await axios.get(`${SERVER_ADRESS}/posts?category.category_name=${category}`);
            const postList = createPostList(jsonData);
            setPostList(postList);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <Layout>
            <SEO title="Categories" />
            <PageTemplate
                header = {<h1>Hi from the {props.type} page</h1>}
                content = {
                <PostsList data = {postList} pageNumber = {props.pageNumber} link = {`/app/categories/${props.type}/page/`} postsLimit = {3}/>}
            />
        </Layout>
    )
}

export default Categories