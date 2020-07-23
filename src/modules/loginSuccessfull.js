import React, {useEffect, useState} from 'react';
import {Link, navigate} from 'gatsby';
import axios from 'axios';

import {SERVER_URL} from "../env/server_variables.env";

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageTemplate from "../components/pageTemplates/headerAndContent";


const LoginSuccessfull = () => {
    const token = window.location.search;
    const provider = window.sessionStorage.getItem("provider");
    const [message, setMessage] = useState("Waiting for login...");
    console.log("TOKEN: ",token);

    useEffect(() => {
        const getUserData = async (token) => {
            try {
                const userData = await axios(`${SERVER_URL}/auth/${provider}/callback/${token}`);
                window.sessionStorage.setItem("userData",JSON.stringify(userData.data));
                window.sessionStorage.setItem('userLogged',true);
                navigate(`/app/blogpost/${window.sessionStorage.getItem('currentPost')}`);
            } catch (error) {
                console.log(error);
                setMessage("Authorization failed, try another account")
                console.log("User logged: ",window.sessionStorage.getItem("userLogged"));
            }
        }

        if(token !== "")
            getUserData(token);
        else
            setMessage("Authorization failed")

    },[])
    return(
        <Layout>
            <SEO title="Categories" />
            <PageTemplate
                content = {
                <div
                    style = {{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <h1 style = {{fontSize: '34px'}}>{message}</h1>
                    <Link 
                        to = {`/app/blogpost/${window.sessionStorage.getItem('currentPost')}`}
                        style = {{
                            width: "fit-content",
                            textDecoration: "none",
                            color: "#166363",
                            padding: "10px",
                            border: "1px solid #166363",
                            textAlign: 'center'
                        }}
                    >
                        <p style = {{margin: 0}}>Back to post</p>
                    </Link>
                </div>
                }
            />
        </Layout>
    )
}

export default LoginSuccessfull;