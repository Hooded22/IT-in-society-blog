import React from 'react';
import blogImage from "../images/Blog.jpg"

const PostList = (props) => {
    return(
        <div className = "postsList">
            <div className = "post">
                <div className = "imageSection">
                    <img src = {blogImage}/>
                </div>
                <div className = "contentSection">
                    <div className = "header">
                        <h2>Category</h2>
                        <h1>Title</h1>
                        <h3>Date</h3>
                    </div>
                    <div className = "shortContent">
                        <p>Lorem ipsum</p>
                        <i>...</i>
                    </div>
                    <div className = "footer">
                        <div className = "comments">
                            <i>icon</i>
                            <p>1</p>
                        </div>
                        <div className = "share">
                            <h4>Share</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostList;