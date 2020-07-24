import React from "react"
import SocialIcons from "./socialIcons";
import Image from "./image"


const AuthorCard = (props) => {
    return(
    <div className = "authorCard">
      <div className = "leftSide">
        <Image name = "profileImage" wrapperStyle = {{width: '160px', borderRadius: '50%', height: '160px', margin: 0}} imgStyle = {{objectPosition: 'center 0.1px', margin: 0}}/>
      </div>
      <div className = "rigthSide">
        <h1>Miło Cię tu widzieć !</h1>
        <h2>ITense znany również jako IT In Society to furtka do świata baśni, czarów, programistycznych arkanów i dobrej zabawy. Ja nazywam się Przemek i witam Cię serdecznie. <span role="img" title=";)">😉</span></h2>
        <h3>Obseruj mnie na</h3>
        <SocialIcons
          size = {21}
          color = "#000"
          width = "none"
        />
      </div>
    </div>
    )
}

export default AuthorCard;
    