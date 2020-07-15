import React from 'react';

import Layout from "../components/layout"
import SEO from "../components/seo";
import SideColumn from "../components/sideColumn";

import "../css/blogpost.css";

const BlogPost = (props) => {

    const POSTS = JSON.parse(localStorage.getItem("posts"));
    const CHOOSES_POST = POSTS[props.id];

    return(
        <Layout>
        <SEO title="Blog post" />
        <div className = "blogpost">
            <div style = {{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around'
            }}>
                <div style = {{
                     width: '65%',
                     display: 'inline-flex',
                     alignContent: 'flex-start',
                     flexDirection: 'column',
                     marginTop: '1.45rem',
                }}>
                    <div className = "header">
                        <h2>{CHOOSES_POST.category}</h2>
                        <h1>{CHOOSES_POST.title}</h1>
                        <h3>{CHOOSES_POST.date}</h3>
                    </div>
                   <img src = {CHOOSES_POST.image}/>
                   <p>{CHOOSES_POST.content}</p>
                </div>
                <SideColumn/>
            </div>
        </div>
    </Layout>
    )  
}

export default BlogPost;