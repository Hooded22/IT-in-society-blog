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
    FaInstagram,
    FaGoogle
} from 'react-icons/fa'
import { SERVER_ADRESS, SERVER_URL} from '../env/server_variables.env';

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

const CommentSection = (props) => {
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
                <h3>Leave Comment</h3>
                <textarea placeholder = "Your message"></textarea>
                <input placeholder = "Your name" type = "text"/>
                <input placeholder = "Email" type = "email"/>
                <div>
                    <button type = "submit">Submit</button>
                </div>
            </form>
        </div>
    )

}

const LoginSection = (props) => {
    const icons = [
        {
            icon: <FaGoogle size = {21} color = "#fff"/>,
            name: 'google'
        },
        {
            icon: <FaInstagram size = {21} color = "#fff"/>,
            name: 'instagram'
        },
        {
            icon: <FaFacebook size = {21} color = "#fff"/>,
            name: 'facebook'
        }
    ]

    const loginHandle = (authName) => {
        window.sessionStorage.setItem("userLogged",true);
        localStorage.setItem("currentPost",props.currentPost);
        window.location = `${SERVER_URL}/connect/${authName}`;
    }

    return(
        <div className = "loginSection">
            <h3>Login by one of below option to leave a comment</h3>
            <ul>
                {
                    icons.map((icon, index) => {
                        return(<li key = {index} className = "loginIcon" onClick = {() => loginHandle(icon.name)}>{icon.icon}</li>)
                    })
                }
            </ul>
        </div>
    )
}


const BlogPost = (props) => {
    const [userLogged, setUserLogged] = useState(window.sessionStorage.getItem("userLogged") || false);
    const [choosenPost, setChoosenPost] = useState(null);

    useEffect(() => {
        const getPost = async (id) => {
            try {
                const jsonData = await axios(`http://localhost:1337/posts?id=${id}`);
                console.log(jsonData.data[0])
                setChoosenPost(jsonData.data[0]);
                   
            } catch (error) {
                console.log(error);
            }
        }
        
        getPost(props.id);
    },[]);

    const RenderTags = () => {
        const tags = choosenPost.tags;
        const result = tags.map((tag,index) => {
            return(<Link key = {index} className = "tag" to = {`/app/tagpage/${tag.tag_name}`}>{tag.tag_name}</Link>)
        });

        return result;
    }

    const StringToHtml = (string) => {
        return (
            <div  dangerouslySetInnerHTML={{__html: string}}/>
           )
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
                                <RenderTags/>
                            </ul>
                        </div>
                    </div>
                    <div className = "share">
                        <p>Share</p>
                        <SocialIcons size = {15}/>
                    </div>
                    {
                         //<CommentSection data = {CHOOSES_POST.comments || []} />
                         <LoginSection
                            currentPost = {choosenPost.id}
                         />
                    }
                    
                </div>
                <SideColumn/>
            </div>
        </div>
    </Layout>
    )  
}

export default BlogPost;