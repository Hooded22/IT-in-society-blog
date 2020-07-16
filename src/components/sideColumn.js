import React, { useState, useEffect } from 'react';
import axios from 'axios';

import bannerImage from '../images/banner2.png';
import {FaSearch} from "react-icons/fa";
import SocialIcons from './socialIcons';
import adminAccount from "../env/adminAccount";
import { SERVER_ADRESS } from '../env/server_variables.env';
import {Link, useStaticQuery, graphql} from 'gatsby';

import "../css/sideColumn.css"


const NewsLetter = () => {
    const [tokenState, setStateToken] = useState("");
    const [emailState, setStateEmail] = useState("");

    useEffect(() => {
        getToken();
    },[])

    async function getToken()
    {
        try {
            const adminData = await adminAccount();
            const token = await adminData.data.jwt;
            setStateToken(token);
        } catch (error) {
            
        }
    }

    function handleSubmit(event)
    {
        event.preventDefault();
        addNewUserEmail();
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
                    "Authorization": `Bearer ${tokenState}`
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
    return(
        <div className = "tags wrapper">
            <h1>Tags</h1>
            <ul>
                <li>Grall</li>
                <li>Structs</li>
                <li>Books</li>
                <li>Material Design</li>
                <li>OOP</li>
                <li>Love</li>
                <li>C++</li>
                <li>Materialism</li>
                <li>Tag</li>
            </ul>
        </div>
    )
}

const Search = () => {
    return (
        <div className = "search wrapper">
            <h1>Search</h1>
            <div>
                <input type = "text" placeholder = "Search..." />
                <div className = "iconBox wrapper">
                    <FaSearch color = "white"/>
                </div>
            </div>
        </div>
    )
}

const LatestPosts = () => {
    const [posts,setPosts] = useState(JSON.parse(localStorage.getItem('posts')).slice(0,3));
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('posts'));
        if(data !== posts)
        {
            const POSTS = [...data].slice(0,3);
            setPosts(POSTS);
            console.log(POSTS,posts);
        }
    },[localStorage.getItem('posts')])


    const Post = (props) => (
        <Link className = "link" to = {`/app/blogpost/${props.id}`}>
            <img src = {props.image} alt = ""/> 
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
                   posts.map((post,index) => {
                       return(
                           <Post
                            id = {index}
                            date = {post.date}
                            title = {post.title}
                            image = {post.image}
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