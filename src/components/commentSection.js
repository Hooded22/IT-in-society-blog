import React, { useState } from 'react'
import {SERVER_ADRESS} from "../env/server_variables.env"
import axios from 'axios';
import { Link, navigate } from 'gatsby';
import {FaTrash, FaEdit} from "react-icons/fa"
import ContentPagesNavigator from "../components/contentPagesNavigator";

import "../css/commentForm.scss"



const CommentSection = (props) => {
    const {user, post, token, userLogged} = props;
    const comments = post ? [...post.comments].reverse() : [];
    const [page, setPage] = useState(1);

    const SHOWED_POST_LIMIT = 3;
    const sliceEnd = SHOWED_POST_LIMIT + page;
    const sliceStart = page == 1 ? 0 : page + 1

    const navigateToPage = (page) => {
        setPage(page);
    }

    const Item = (props) => (
        <li className = "item">
            <button 
                onClick = {() => props.itemMethod(props.id)} 
                className = {props.class} 
            >
                {props.content}
            </button>
        </li>
    )

    return(
        <div className = "commentSection">
            <h3>{comments.length || 0} comments</h3>
            <ul>
                {
                    comments.slice(sliceStart,sliceEnd).map((comment, index) => {
                        return(
                            <li key = {index} className = "commentItem">
                                <Comment
                                    id = {comment.id} 
                                    user = {user}
                                    data = {comment}
                                    token = {token}
                                    postId = {post.id}
                                />
                            </li>
                        )
                    })
    
                }
                <ul className = "commentNavigation">
                    <ContentPagesNavigator
                        limit = {comments.length/SHOWED_POST_LIMIT+1}
                        currentPage = {page}
                        itemMethod = {(id) => navigateToPage(id)}
                        item = {Item}
                                        
                    />
                </ul>
            </ul>
            {
            userLogged 
            ? <Form 
                user = {user}
                token = {token}
                postId = {post.id}
              /> 
            : ''}
        </div>
    )

}

const Comment = (props) => {
    const {token, postId, id, user, data} = props;
    const {date, user_name, content} = data;
    const commentOwner = parseInt(data.user);
    const image = "/uploads/avatar_fb3139d78a.png";

    const updateComment = (commentId, email, username, previousPostId, token) => {
        navigate(`/app/updatecomment/${commentId}/${email}/${username}/${previousPostId}/${token}`)
    }

    const removeComment = async (id, token) => {
        const MESS = window.confirm("Are you sure ?");
        if(MESS)
        {
            try {
                await axios.delete(`${SERVER_ADRESS}/comments/${id}`,{
                    headers:
                    {
                        "Authorization":`Bearer ${token}`
                    }
                })
                alert("Comment removed");
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
            
        }
    }

    return(
        <div className = "comment">
            <div className = "profilImage">
                <img src = {SERVER_ADRESS+image} alt = "profile"/>
            </div>
            <div className = "contentSection">
                <div className = "header">
                    <h2>{user_name}</h2>
                    <p>{date}</p>
                </div>
                <div className = "content">
                    <p>{content}</p>
                </div>
                {
                    user?.id == commentOwner 
                    ? <div className = "actionButtonsContainer">
                        <button 
                            className = "actionButton" 
                            onClick = {() => updateComment(id, user.email, user.username, postId, token)} 
                            title = "edit post"
                        >
                            <FaEdit/>
                        </button>
                        <button 
                            className = "actionButton"
                            title = "Remove post"
                            onClick = {() => removeComment(id, token)}
                        >
                            <FaTrash/>
                        </button> 
                    </div>
                    : ""
                }
            </div>
        </div> 
    )
}

const Form = (props) => {
    const {user,token, postId} = props;
    const [commentText, setCommentText] = useState("");
  

    const textAreaHandler = (event) => {
        setCommentText(event.target.value);
    }

    const createComment = (event) => {
        event.preventDefault();
        const date = getDate();
        if(commentText != "")
        {
            const comment = buildComment(String(commentText), user, date, postId);
                postComment(comment, token);
        }
        else
        {
            alert("Comment cannot be empty")
        }
        console.log(token)
        setCommentText("");
    }

    const getDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    const buildComment = (content, userData, date, postId) => {
        const comment = {
            "user_name": `${userData.username}`,
            "user_email": `${userData.email}`,
            "user": `${userData.id}`,
            "post": `${postId}`,
            "content": `${content}`,
            "date": `${date}`,
        }
        return comment;
    }

    const postComment = async (comment,token) => {
        try {
            axios({
                url: `${SERVER_ADRESS}/comments`,
                method: "POST",
                data: {
                    ...comment
                },
                headers:
                {
                    "Authorization":`Bearer ${token}`
                }
            })
            .then(() => window.location.reload())
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <form onSubmit = {createComment}>
            <textarea placeholder = "Your message" onChange = {textAreaHandler} value = {commentText}></textarea>
            <input placeholder = "Your name" type = "text" value = {user.username} disabled = {true}/>
            <input placeholder = "Email" type = "email" value = {user.email} disabled = {true}/>
            <div className = "buttonWrapper">
                <button type = "button" onClick = {createComment}>Submit</button>
            </div>
        </form>
    )
}

export default CommentSection;