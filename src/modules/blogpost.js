import React, { useState, useEffect } from 'react';
import {Link} from 'gatsby';
import axios from 'axios';
import SocialIcons from '../components/socialIcons';
import {FaFacebook, FaTwitter, FaPinterest} from 'react-icons/fa';


import "../css/blogpost.scss";

import { SERVER_ADRESS, LOCAL_ADRESS} from '../env/server_variables.env';

import Layout from "../components/layout"
import SEO from "../components/seo";
import SideColumn from "../components/sideColumn";
import LoginSection from "../components/loginSection";
import CommentSection from "../components/commentSection";

const BlogPost = (props) => {
    const [userLogged, setUserLogged] = useState(window.sessionStorage.getItem('userLogged') ? true : false);
    const [choosenPost, setChoosenPost] = useState(null);
    const userData = JSON.parse(window.sessionStorage.getItem("userData"));
    const user = userData?.user || {};

    useEffect(() => {
        const getPost = async (id) => {
            try {
                const jsonData = await axios(`${SERVER_ADRESS}/posts?id=${id}`);
                setChoosenPost(jsonData.data[0]);
                   
            } catch (error) {
                console.log(error);
            }
        }

        getPost(props.id);
    },[]);

    const StringToHtml = (string) => <div  dangerouslySetInnerHTML={{__html: string}}/>

    const icons = [
        {
            icon: <FaFacebook className = "linkedin" size = {16} color = {"#000"} />,
            link: `https://www.facebook.com/sharer.php?u=${LOCAL_ADRESS}/app/blogpost/${choosenPost?.id}&t=${choosenPost?.Title}`
        },
        {
            icon: <FaTwitter className = "instagram" size = {16} color = {"#000"} />,
            link: "https://www.instagram.com/home/"
        },
        {
            icon: <FaPinterest className = "github" size = {16} color = {"#000"} />,
            link: `https://pl.pinterest.com/pin/create/button/?url=${LOCAL_ADRESS}/app/blogpost/${choosenPost?.id}/&description=${choosenPost?.Title}`
        }
    ]

    if(choosenPost == null)
    return(
        <h1>Activity indicator here</h1>
    )

    return(
        <Layout>
        <SEO title="Blog post" />
        <div className = "blogpost">
            <div className = "container">
                <div className = "postColumn">
                    <div className = "singlePost">
                        <div className = "header">
                            <h2>{choosenPost.category.category_name || ""}</h2>
                            <h1>{choosenPost.Title}</h1>
                            <h3>{choosenPost.Date}</h3>
                        </div>
                        <div className = "content">
                            <img src = {SERVER_ADRESS + choosenPost.Image[0].url} alt = "Blogpost"/>
                            {StringToHtml(choosenPost.Content)}
                        </div>
                        <div className = "footer">
                            <ul>
                                <RenderTags tags = {choosenPost.tags}/>
                            </ul>
                        </div>
                    </div>
                    <div className = "share">
                        <p>Share</p>
                        <SocialIcons size = {15} data = {icons}/>
                    </div>
                        <LoginSection 
                            setUserLogged = {setUserLogged}
                            postId = {choosenPost.id}
                            userLogged = {userLogged}
                            username = {user.username}
                        />
                        <CommentSection 
                            post = {choosenPost || {}} 
                            user = {user} 
                            token = {userData?.jwt} 
                            userLogged = {userLogged}
                        />
                </div>
                <SideColumn/>
            </div>
        </div>
    </Layout>
    )  
}

const RenderTags = (props) => {
    const {tags} = props;
    const result = tags.map((tag,index) => {
        return(<Link key = {index} className = "tag" to = {`/app/tagpage/${tag.tag_name}`}>{tag.tag_name}</Link>)
    });

    return result;
}



export default BlogPost;