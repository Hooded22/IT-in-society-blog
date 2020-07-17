import React, { useState, useEffect } from 'react';
import axios from 'axios';

import bannerImage from '../images/banner2.png';
import {FaSearch} from "react-icons/fa";
import SocialIcons from './socialIcons';
import {password, login} from "../env/adminAccount";
import { SERVER_ADRESS } from '../env/server_variables.env';
import {Link, navigate} from 'gatsby';

import "../css/sideColumn.css"


const NewsLetter = () => {
    const [token, setStateToken] = useState("");
    const [emailState, setStateEmail] = useState("");

    useEffect(() => {
        getToken();
    },[])

    async function getToken()
    {
        try {
            const admin = await axios.post(`${SERVER_ADRESS}/auth/local`,{
                identifier: login,
                password: password
            });
            const token = await admin.data.jwt;
            setStateToken(token);
        } catch (error) {
            
        }
    }

    async function handleSubmit(event)
    {
        event.preventDefault();
        try {
            await getToken();
            addNewUserEmail();
        } catch (error) {
            console.error(error);
        }
        
    }

    function handleChange(event)
    {
        setStateEmail(event.target.value);
    }

    async function addNewUserEmail()
    {
        try {
            await fetch(`${SERVER_ADRESS}/emails`,{
                method: "POST",
                body:JSON.stringify(
                    {
                        user_email: emailState
                    }
                ),
                headers:
                {
                    "Authorization": `Bearer ${token}`
                }
            }).then(data => console.log(data));
            setStateEmail("");
        } catch (error) {
            console.error(error)
        }
    }
    
    return(
        <div className = "newsletter wrapper">
            <h1>NewsLetter</h1>
            <form onSubmit = {handleSubmit}>
                <input className = "emailInput" type = "email" name = "Newsletter_email"  placeholder = "Your email adress"
                    onChange = {handleChange}
                    value = {emailState}
                />
                <button className = "sendEmailButton" type = "submit">
                    Sign Up
                </button>
            </form>
        </div>
    )
}

const Banner = () => {
    return(
        <div className = "banner wrapper">
            <h1>Banner</h1>
            <img src = {bannerImage} alt = ""/>
        </div>
    )
}

const Categories = () => {
    const [categorieState, setStateCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`${SERVER_ADRESS}/categories`);
            setStateCategories(result.data);
        }

        fetchData();
    },[]);

    function firstLetterUpper(str)
    {
        const string = str.slice(0);
        const bigLetter = string.charAt(0).toUpperCase();
        return bigLetter + string.slice(1);
    }

    return(
    <div className = "categories wrapper">
        <h1>Categories</h1>
        <ul>
           {
               categorieState.map((item) => {
                return(
                     <Link className = "link" key = {item.id} to = {`/app/categories/${item.category_name}`}>{firstLetterUpper(item.category_name)} <span>({item.posts.length})</span></Link>
                )
               })
           }
        </ul>
    </div>
    )
}

const Tags = () => {
    const [tags,setTags] = useState("");

    useEffect(() => {
        const getTags = async () => {
            try {
                const newTags = await axios(`${SERVER_ADRESS}/tags`);
                setTags(newTags.data);
            } catch (error) {
                console.error(error);
            }
        }

        getTags();
    },[]);

    const RenderTagList = () => {
        const tagCopy = [...tags];
        const tagArray = tagCopy.map((tag,index) => {
            return(<Link key = {index} className = "tagLink" to = {`/app/tagpage/${tag.tag_name}`} >{tag.tag_name}</Link>);
        });

        return tagArray;
    } 
    return(
        <div className = "tags wrapper">
            <h1>Tags</h1>
            <ul>
               <RenderTagList/>
            </ul>
        </div>
    )
}

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        const value = String(event.target.value);
        setSearchTerm(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchTerm !== "")
        {
            navigate(`/app/searchresult/${searchTerm}`)
        }
    }

    return (
        <div className = "search wrapper">
            <h1>Search</h1>
            <div>
                <input type = "text" placeholder = "Search..." value = {searchTerm} onChange = {handleChange} />
                <button className = "iconBox wrapper" type = "submit" onClick = {handleSubmit}>
                    <FaSearch color = "white"/>
                </button>
            </div>
        </div>
    )
}

const LatestPosts = () => {
    const [postState,setPosts] = useState(JSON.parse(localStorage.getItem('posts')).slice(0,3));
    useEffect(() => {
        const localStoragePosts = localStorage.getItem('posts');
        const postsCopy = [...postState];
        const DATA = JSON.parse(localStoragePosts);
        if(DATA !== postsCopy)
        {
            const POSTS_TO_SEND = [...DATA].slice(0,3);
            setPosts(POSTS_TO_SEND);
        }
    },[])


    const Post = (props) => (
        <Link className = "link" to = {`/app/blogpost/${props.id}`}>
            <img src = {props.image} alt = "" loading = "lazy"/> 
            <div className = "content">
                <h3>{props.date}</h3>
                <h2>{props.title}</h2>
            </div>
        </Link>
    )

    return(
        <div className = "latestPosts wrapper">
            <h1>Latest posts</h1>
            <ul>
               {
                   postState.map((post,index) => {
                       return(
                           <Post
                            id = {post.id}
                            date = {post.date}
                            title = {post.title}
                            image = {post.image}
                            key = {index}
                           />
                       )
                   })
               }
            </ul>
        </div>
    )
}
const SideColumn = (props) => {
    return(
        <div className = "sideColumn">
            <NewsLetter/>
            <Banner/>
            <Categories/>
            <Tags/>
            <Search/>
            <LatestPosts/>
            <div className = "socialIcons wrapper">
                <h1>Social media</h1>
                <SocialIcons
                    color = "#000"
                    size = {21}
                />
            </div>
        </div>
    )
}

export default SideColumn;