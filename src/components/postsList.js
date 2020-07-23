import React, {useEffect, useState} from 'react';
import {FiMessageCircle} from 'react-icons/fi';
import {FaFacebook, FaTwitter, FaPinterest} from 'react-icons/fa';
import axios from 'axios';

import {Link, navigate} from 'gatsby';
import "../css/posts.css"
import SocialIcons from "./socialIcons";
import {SERVER_ADRESS, LOCAL_ADRESS} from "../env/server_variables.env";

import ContentPagesNavigator from "../components/contentPagesNavigator"


function createPostList(postJSON)
    {
        if(postJSON.data.length === 0 || postJSON == null)
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
                image:  post.Image[0].url,
                alt: post.Image[0].alt,
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

    const icons = [
        {
            icon: <FaFacebook className = "linkedin" size = {16} color = {"#000"} />,
            link: `https://www.facebook.com/sharer.php?u=${LOCAL_ADRESS}/app/blogpost/${props.id}&t=${props.title}`
        },
        {
            icon: <FaTwitter className = "instagram" size = {16} color = {"#000"} />,
            link: "https://www.instagram.com/home/"
        },
        {
            icon: <FaPinterest className = "github" size = {16} color = {"#000"} />,
            link: `https://pl.pinterest.com/pin/create/button/?url=${LOCAL_ADRESS}/app/blogpost/${props.id}/&description=${props.title}`
        }
    ]

    return(
        <div className = {props.reverse ? "post postReverse" : "post"}  >
                <Link className = "imageSection" to = {linkDestination} >
                    <img src = {props.image} loading = "lazy" alt = {props.alt} />
                </Link>
                <div className = {props.reverse ? "contentSection contentSectionReverse" : "contentSection"}>
                    <Link to = {linkDestination} style = {linkStyle}>
                        <div className = "header">
                            <h2>{props.category}</h2>
                            <h1>{props.title}</h1>
                            <h3>{props.date}</h3>
                        </div>
                        <div className = "content">
                            {props.short_content}
                            <i>...</i>
                        </div>
                    </Link>
                    <div className = "footer">
                        <div className = "comments">
                            <FiMessageCircle/>
                            <p>{props.comments}</p>
                        </div>
                        <div className = "share">
                            <h4>Udostępnij</h4>
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



const StringToHtml = (string) => <div  dangerouslySetInnerHTML={{__html: string}}/>

const PostList = (props) => {
    const PAGE_NUMBER = parseInt(props.pageNumber) <= 0 ? 1 : parseInt(props.pageNumber) || 1;
    const SHOWED_POST_LIMIT = props.postsLimit - 1;
    const sliceEnd = SHOWED_POST_LIMIT + PAGE_NUMBER;
    const sliceStart = PAGE_NUMBER === 1 ? 0 : PAGE_NUMBER + 1
    const posts = props.data;


    const Item = (props) => (
        <li className = "item"><button onClick = {() => navigate(props.link)} className = {props.class} >{props.content}</button></li>
    )

    if(!posts)
    {
        return(
            <div style = {{width: "65%"}}>
                <p style = {{width: "100%", textAlign: "center"}}>Nie znaleziono żadnych postów.</p>
            </div>
        )
    }

    return(
        <div className = "postsList">
            {
               posts.slice(sliceStart,sliceEnd).map((post,index) => {
                    return(
                        <Post
                            id = {post.id}
                            key = {post.id}
                            title = {post.title}
                            short_content = {StringToHtml(post.short_content)}
                            image = {post.image}
                            date = {post.date}
                            category = {post.category}
                            comments = {1}
                            reverse = {index % 2 === 0 ? true : false}
                            alt = {post.alt}
                        />
                    )
                })
            }
            <div className = "postPages">
                <ul>
                    <ContentPagesNavigator
                        limit = {Math.ceil(posts.length / 4)}
                        currentPage = {PAGE_NUMBER}
                        link = {props.link}
                        item = {Item}
                    />
                </ul>
            </div>
        </div>
    )
}

const DefaulPostList = (props) => {
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        getPosts();
    },[])

    async function getPosts()
    {
        try 
        {
            const jsonData = await axios.get(`${SERVER_ADRESS}/posts`);
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
            pageNumber = {props.pageNumber}
            link = {props.link}
            postsLimit = {props.postsLimit}
       />
    )
}

export {Post, DefaulPostList, createPostList};
export default PostList;