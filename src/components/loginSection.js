import React from 'react'
import {FaFacebook, FaGoogle, FaTwitter} from 'react-icons/fa'
import {SERVER_URL} from "../env/server_variables.env"

const LoginSection = (props) => {
    const {setUserLogged, userLogged, postId} = props;
    const icons = [
        {
            icon: <FaGoogle size = {21} color = "#fff"/>,
            name: 'google'
        },
        {
            icon: <FaTwitter size = {21} color = "#fff"/>,
            name: 'twitter'
        },
        {
            icon: <FaFacebook size = {21} color = "#fff"/>,
            name: 'facebook'
        }
    ]

    const logoutHandle = (setUserLogged) =>
    {
        window.sessionStorage.removeItem('userLogged');
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem("userData");
        setUserLogged(false);
        console.log("Loging out");
    }
       
    const loginHandle = (authName, postId) => {
        window.sessionStorage.setItem("provider",authName);
        window.sessionStorage.setItem("currentPost",postId);
        window.location = `${SERVER_URL}/connect/${authName}`;
    }

    if(userLogged)
    {
        return(
        <div className = "loginSection">
            <div className = "formHeader">
                <h3>Zostaw komentarz</h3>
                <h4>Jesteś zalogowany jako: <span>{props.username}</span></h4>
                <button className = "logoutButton" type = "button" onClick = {() => logoutHandle(setUserLogged)}>Logout</button>
            </div>
        </div> 
    )}

    return(
        <div className = "loginSection">
            <h3>Zaloguj się aby dodawać komentarze.</h3>
            <ul>
                {
                    icons.map((icon, index) => {
                        return(
                        <li key = {index}>
                            <button className = "loginIcon" onClick = {() => loginHandle(icon.name, postId)}>
                                {icon.icon}
                            </button>
                        </li>)
                    })
                }
            </ul>
        </div>
    )
}

export default LoginSection;