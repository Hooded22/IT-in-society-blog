import React from "react"
import SocialIcons from "./socialIcons";
import Image from "./image"


const AuthorCard = () => {
    return(
    <div className = "authorCard">
      <div className = "leftSide">
        <Image name = "profileImage" wrapperStyle = {{width: '160px', borderRadius: '50%', height: '160px', margin: 0}} imgStyle = {{objectPosition: 'center 0.1px', margin: 0}}/>
      </div>
      <div className = "rigthSide">
        <h1>BIG TITLE ABOUT BLOG</h1>
        <h2>My name is ......</h2>
        <h3>Follow me on</h3>
        <SocialIcons
          size = {21}
          color = "#000"
          width = "40%"
        />
      </div>
    </div>
    )
}

export default AuthorCard;
    