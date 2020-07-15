import React from 'react';
import bannerImage from '../images/banner2.png';
import {FaSearch} from "react-icons/fa";
import SocialIcons from './socialIcons';

import "../css/sideColumn.css"

const NewsLetter = () => {
    return(
        <div className = "newsletter wrapper">
            <h1>NewsLetter</h1>
            <input className = "emailInput" type = "email" name = "Enter your e-mail"  placeholder = "Your email adress"/>
            <button className = "sendEmailButton">
                Sign Up
            </button>
        </div>
    )
}

const Banner = () => {
    return(
        <div className = "banner wrapper">
            <h1>Banner</h1>
            <img src = {bannerImage}/>
        </div>
    )
}

const Categories = () => {
    return(
    <div className = "categories wrapper">
        <h1>Categories</h1>
        <ul>
            <li>Stories <span>(1)</span></li>
            <li>Algos <span>(5)</span></li>
            <li>Lifestyle <span>(2)</span></li> 
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

    const Post = (props) => (
        <li>
            <img src = "https://noemi.px-lab.com/personal-view/wp-content/uploads/sites/2/2016/05/50-380x250.png"/> 
            <div className = "content">
                <h3>{props.data}</h3>
                <h2>{props.title}</h2>
            </div>
        </li>
    )

    return(
        <div className = "latestPosts wrapper">
            <h1>Latest posts</h1>
            <ul>
               <Post
                data = "9 may 2020"
                title = "Title"
               />
                <Post
                data = "9 may 2020"
                title = "Title"
               />
                <Post
                data = "9 may 2020"
                title = "Title"
               />
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