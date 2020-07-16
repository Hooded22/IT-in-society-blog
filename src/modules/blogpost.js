import React from 'react';

import Layout from "../components/layout"
import SEO from "../components/seo";
import SideColumn from "../components/sideColumn";
import {Link} from 'gatsby';

import "../css/blogpost.css";

const BlogPost = (props) => {

    const POSTS = JSON.parse(localStorage.getItem("posts"));
    const CHOOSES_POST = POSTS[props.id];

    const RenderTags = () => {
        const result = [];
        const tags = CHOOSES_POST.tags;
        tags.map(tag => {
            result.push(<Link className = "tag" to = {`/app/tagpage/${tag.tag_name}`}>{tag.tag_name}</Link>)
        });

        return result;
    }

    return(
        <Layout>
        <SEO title="Blog post" />
        <div className = "blogpost">
            <div className = "container">
                <div className = "postColumn">
                    <div className = "singlePost">
                        <div className = "header">
                            <h2>{CHOOSES_POST.category}</h2>
                            <h1>{CHOOSES_POST.title}</h1>
                            <h3>{CHOOSES_POST.date}</h3>
                        </div>
                        <div className = "content">
                            <img src = {CHOOSES_POST.image} alt = "Blogpost"/>
                            <p>{CHOOSES_POST.content}</p>
                        </div>
                        <div className = "footer">
                            <ul>
                                <RenderTags/>
                            </ul>
                        </div>
                    </div>
                    
                </div>
                <SideColumn/>
            </div>
        </div>
    </Layout>
    )  
}

export default BlogPost;