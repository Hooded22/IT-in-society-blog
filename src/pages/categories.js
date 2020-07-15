import React, {useEffect, useState} from 'react';
import axios from 'axios'

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsList, {createPostList} from '../components/postsList';
import SideColumn from "../components/sideColumn";
import {SERVER_ADRESS} from "../env/server_variables.env";

const Categories = (props) => {
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        const CATEGORY_NAME = props.type;
        getPostByCategory(CATEGORY_NAME);
    },[]);
    
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
            <div style = {{
                display: "flex",
                flexDirection: 'column',
            }}>
                <div style = {{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                }}>
                     <h1>Hi from the {props.type} page</h1>
                </div>
                <div style = {{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-around'
                }}>
                    <PostsList 
                        data = {postList}
                    />
                    <SideColumn/>
                </div>
            </div>
        </Layout>
    )
}

export default Categories