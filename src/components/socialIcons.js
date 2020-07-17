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
            alignItems: "center",
            pointerEvents: "none"
        },
        link: {
            textDecoration: "none",
            color: "black",
            cursor: "pointer"
        }
    
    }

    const data = props.data == null ? socialIconList : props.data;

return(
    <div className = "container" style = {props.style == null ? styles.container : props.style}>
        {
            data.map((iconObj,index) => (
                <a key = {index} href = {iconObj.link} style = {styles.link} target = "blank">{iconObj.icon}</a>
            ))
        }
    </div>
)
}

export default SocialIcons;

