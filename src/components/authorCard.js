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
        <h2>Niezmiernie miło mi jest powitać Cię na moim blogu. Ja nazywam się Przemek i mam nadzieję że to skromne miejsce stanie się dla Ciebie furtką na nieznany do tej pory świat. <span role="img" aria-label=";)">😉</span></h2>
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
    