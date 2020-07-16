import React, {useEffect, useState} from 'react';
import axios from 'axios'

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsList, {createPostList} from '../components/postsList';
import SideColumn from "../components/sideColumn";
import {SERVER_ADRESS} from "../env/server_variables.env";

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
            <div style = {{
                display: "flex",
                flexDirection: 'column',
            }}>
                <div style = {{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                }}>
                     <h1>Hi from the {props.tagName} page</h1>
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

export default TagPage;