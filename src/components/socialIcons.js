import React from "react"
import {
  FaLinkedin,
  FaInstagram,
  FaGithub
} from 'react-icons/fa'

const SocialIcons = (props) => {

    const socialIconList = [
        {
            icon: <FaLinkedin className = "linkedin" size = {props.size} color = {props.color} />,
            link: "https://www.linkedin.com/in/przemyslaw-sipta/"
        },
        {
            icon: <FaInstagram className = "instagram" size = {props.size} color = {props.color} />,
            link: "https://www.instagram.com/hooded_alberchi/"
        },
        {
            icon: <FaGithub className = "github" size = {props.size} color = {props.color} />,
            link: "https://github.com/Hooded22"
        }
    ]

    const styles = {
        container:{
            width: props.width == null ? '100%' : props.width,
            height: '50px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
    
    }

return(
    <div class = "container" style = {styles.container}>
        {
            socialIconList.map(iconObj => (
                <a href = {iconObj.link} target = "blank">{iconObj.icon}</a>
            ))
        }
    </div>
)
}

export default SocialIcons;

