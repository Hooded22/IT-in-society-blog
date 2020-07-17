import React, {useEffect, useState} from 'react';
import {FiMessageCircle} from 'react-icons/fi';
import {FaFacebook, FaTwitter, FaPinterest} from 'react-icons/fa';
import axios from 'axios';

import {Link} from 'gatsby';
import "../css/posts.css"
import SocialIcons from "./socialIcons";
import {SERVER_ADRESS} from "../env/server_variables.env";


const icons = [
    {
        icon: <FaFacebook className = "linkedin" size = {16} color = {"#000"} />,
        link: "https://www.linkedin.com/in/przemyslaw-sipta/"
    },
    {
        icon: <FaTwitter className = "instagram" size = {16} color = {"#000"} />,
        link: "https://www.instagram.com/hooded_alberchi/"
    },
    {
        icon: <FaPinterest className = "github" size = {16} color = {"#000"} />,
        link: "https://github.com/Hooded22"
    }
]

function createPostList(postJSON)
    {
        if(postJSON.data.length == 0 || postJSON == null)
            return 0;
        const POST_LIST = postJSON?.data;
        const newPostList = [];
        POST_LIST.map(post => {
            let postObject = {
                id: post.id,
                title: post.Title,
                short_content:  post.short_content,
                content: post.Content,
                date: post.Date,
                category:  post.category?.category_name,
                image:  SERVER_ADRESS + post.Image[0].url,
                tags: post.tags,
                comments: post.comments
            }
            newPostList.unshift(postObject);
            return 0;
        })
        return newPostList;
    }

const Post = (props) => {
    const linkDestination = `/app/blogpost/${props.id}`
    const linkStyle = {color: "black", textDecoration: "none"}
    return(
        <div className = {props.reverse ? "post postReverse" : "post"}  >
                <Link className = "imageSection" to = {linkDestination} >
                    <img src = {props.image} alt = "Post"/>
                </Link>
                <div className = {props.reverse ? "contentSection contentSectionReverse" : "contentSection"}>
                    <Link to = {linkDestination} style = {linkStyle}>
                        <div className = "header">
                            <h2>{props.category}</h2>
                            <h1>{props.title}</h1>
                            <h3>{props.date}</h3>
                        </div>
                        <div className = "content">
                            <p>{props.short_content}</p>
                            <i>...</i>
                        </div>
                    </Link>
                    <div className = "footer">
                        <div className = "comments">
                            <FiMessageCircle/>
                            <p>{props.comments}</p>
                        </div>
                        <div className = "share">
                            <h4>Share</h4>
                            <SocialIcons
                                data = {icons}
                                style = {{
                                    width: "40%",
                                    display: "inline-flex",
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
    )
}

const PostList = (props) => {
    if(props.data == null)
    {
        return(<h1>No posts.</h1>)
    }
    const posts = props.data;
    return(
        <div className = "postsList">
            {
               posts.map((post,index) => {
                    return(
                        <Post
                            id = {post.id}
                            key = {post.id}
                            title = {post.title}
                            short_content = {post.short_content}
                            image = {post.image}
                            date = {post.date}
                            category = {post.category}
                            comments = {1}
                            reverse = {index % 2 === 0 ? true : false}
                        />
                    )
                })
            }
        </div>
    )
}

const DefaulPostList = () => {
    const [postList, setPostList] = useState(JSON.parse(localStorage.getItem("posts")) || []);
    useEffect(() => {
        getPosts();
    },[])

    async function getPosts()
    {
        try 
        {
            const jsonData = await axios.get(`http://localhost:1337/posts`);
            const newPostList = createPostList(jsonData);
            if(newPostList !== postList)
            {
                setPostList(newPostList);
            }
        } 
        catch (error)
        { 
            console.log(error);
        }
       
    }

    return(
       <PostList
            data = {postList}
       />
    )
}

export {Post, DefaulPostList, createPostList};
export default PostList;