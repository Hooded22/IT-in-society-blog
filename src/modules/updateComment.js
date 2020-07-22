import React, {useState} from 'react';
import {navigate} from 'gatsby'
import axios from 'axios';
import PageTemplate from "../components/pageTemplates/headerAndContent";
import Layout from "../components/layout"
import SEO from "../components/seo"
import {SERVER_ADRESS} from "../env/server_variables.env"

import "../css/commentForm.scss"

const UpdateComment = (props) => {
    const {commentId, previousPostId, token, email, username} = props;
    const backToPreviousSide = (id) => {
        navigate(`/app/blogpost/${id}`);
    }
    return(
        <Layout>
            <SEO title="Categories" />
            <PageTemplate
                header = {<h1>Update post</h1>}
                content = {
                   <div style = {{width:"65%"}}>
                        <Form
                            backToPreviousSide = {() => backToPreviousSide(previousPostId)}
                            commentId = {commentId}
                            token = {token}
                            commentEmail = {email}
                            commentUserName = {username}
                        />
                   </div>
                }
            />
        </Layout>
    )
}

const Form = (props) => {
    const {token, commentId, commentEmail, commentUserName, backToPreviousSide} = props;
    const [commentText, setCommentText] = useState("");

    const textAreaHandler = (event) => {
        setCommentText(event.target.value);
    }
  
    const createComment = (event) => {
        event.preventDefault();
        const date = getDate();
        if(commentText == "")
            alert("Comment cannot be empty")
        else
            updateComment(commentText, date, token, commentId);
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

    const updateComment = async (content, date, token, id) => {
        try {
            axios({
                url: `${SERVER_ADRESS}/comments/${id}`,
                method: "PUT",
                data: {
                    content: content,
                    date: date
                },
                headers:
                {
                    "Authorization":`Bearer ${token}`
                }
            })
            .then(() => backToPreviousSide())
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <form onSubmit = {createComment}>
            <textarea placeholder = "Your message" onChange = {textAreaHandler} value = {commentText}></textarea>
            <input placeholder = "Your name" type = "text" value = {commentUserName} disabled = {true}/>
            <input placeholder = "Email" type = "email" value = {commentEmail} disabled = {true}/>
            <div className = "buttonWrapper">
                <button type = "button" onClick = {createComment}>Update</button>
            </div>
        </form>
    )
}

export default UpdateComment;

