import React, { useState, useEffect } from 'react';

import Layout from "../components/layout"
import SEO from "../components/seo";
import SideColumn from "../components/sideColumn";
import {Link} from 'gatsby';
import axios from 'axios';

import "../css/blogpost.scss";
import SocialIcons from '../components/socialIcons';
import {
    FaFacebook,
    FaTwitter,
    FaGoogle
} from 'react-icons/fa'
import { SERVER_ADRESS, SERVER_URL} from '../env/server_variables.env';

const BlogPost = (props) => {
    const [userLogged, setUserLogged] = useState(window.sessionStorage.getItem('userLogged') ? true : false);
    const [choosenPost, setChoosenPost] = useState(null);
    const userData = JSON.parse(window.sessionStorage.getItem("userData"));
    const user = userData?.user || {};

    useEffect(() => {
        const getPost = async (id) => {
            try {
                const jsonData = await axios(`http://localhost:1337/posts?id=${id}`);
                setChoosenPost(jsonData.data[0]);
                   
            } catch (error) {
                console.log(error);
            }
        }

        getPost(props.id);
    },[]);

    const StringToHtml = (string) => <div  dangerouslySetInnerHTML={{__html: string}}/>

    const logoutHandle = () =>
    {
        window.sessionStorage.removeItem('userLogged');
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem("userData");
        setUserLogged(false);
        console.log("Loging out");
    }

    const loginHandle = (authName) => {
        window.sessionStorage.setItem("provider",authName);
        window.sessionStorage.setItem("currentPost",choosenPost.id);
        window.location = `${SERVER_URL}/connect/${authName}`;
    }

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
                        <SocialIcons size = {15}/>
                    </div>
                        <LoginSection 
                            logoutHandle = {logoutHandle} 
                            loginHandle = {(authName) => loginHandle(authName)}
                            userLogged = {userLogged}
                            username = {user.username}
                        />
                        {userLogged ? <CommentSection data = {choosenPost.comments || []} user = {user}/> : ''}
                </div>
                <SideColumn/>
            </div>
        </div>
    </Layout>
    )  
}

const RenderTags = (props) => {
    const tags = props.tags;
    const result = tags.map((tag,index) => {
        return(<Link key = {index} className = "tag" to = {`/app/tagpage/${tag.tag_name}`}>{tag.tag_name}</Link>)
    });

    return result;
}

const LoginSection = (props) => {
    const icons = [
        {
            icon: <FaGoogle size = {21} color = "#fff"/>,
            name: 'google'
        },
        {
            icon: <FaTwitter size = {21} color = "#fff"/>,
            name: 'twitter'
        },
        {
            icon: <FaFacebook size = {21} color = "#fff"/>,
            name: 'facebook'
        }
    ]

    const logoutHandle = () =>  props.logoutHandle();
       
    const loginHandle = (authName) => props.loginHandle(authName);

    if(props.userLogged)
    {
        return(
        <div className = "loginSection">
            <div className = "formHeader">
                <h3>Leave Comment</h3>
                <h4>Your are logged as: <span>{props.username}</span></h4>
                <button className = "logoutButton" type = "button" onClick = {() => logoutHandle()}>Logout</button>
            </div>
        </div> 
    )}

    return(
        <div className = "loginSection">
            <h3>Login by one of below option to leave a comment</h3>
            <ul>
                {
                    icons.map((icon, index) => {
                        return(
                        <li key = {index}>
                            <button className = "loginIcon" onClick = {() => loginHandle(icon.name)}>
                                {icon.icon}
                            </button>
                        </li>)
                    })
                }
            </ul>
        </div>
    )
}

const CommentSection = (props) => {
    const {user} = props;

    const Comment = (props) => {
        return(
            <div className = "comment">
                <div className = "profilImage">
                    <img src = "http://localhost:1337/uploads/Blog_83cbe207ae.jpeg" alt = "profile"/>
                </div>
                <div className = "contentSection">
                    <div className = "header">
                        <h2>{props.author}</h2>
                        <p>{props.date}</p>
                    </div>
                    <div className = "content">
                        <p>{props.content}</p>
                    </div>
                </div>
            </div> 
        )
    }

    return(
        <div className = "commentSection">
            <h3>{props.data.length || 0} comments</h3>
            <ul>
                {
                    props?.data.map((comment, index) => {
                        return(
                            <li key = {index} className = "commentItem">
                                <Comment 
                                    author = {comment.user_name}
                                    date = {comment.date}
                                    content = {comment.content}
                                />
                            </li>
                        )
                    })
                }
            </ul>
            <form>
                <textarea placeholder = "Your message"></textarea>
                <input placeholder = "Your name" type = "text" value = {user.username} disabled = {true}/>
                <input placeholder = "Email" type = "email" value = {user.email} disabled = {true}/>
                <div className = "buttonWrapper">
                    <button type = "submit">Submit</button>
                </div>
            </form>
        </div>
    )

}


export default BlogPost;