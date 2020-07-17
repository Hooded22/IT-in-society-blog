import React, {useEffect, useState} from 'react';
import {Link} from 'gatsby';
import axios from 'axios';

import {SERVER_ADRESS,SERVER_URL} from "../env/server_variables.env";

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageTemplate from "../components/pageTemplates/headerAndContent";


const LoginSuccessfull = () => {
    const token = window.location.search;
    const [userData, setUserData] = useState("");

    useEffect(() => {
        const getUserData = async (token) => {
            try {
                const userData = await axios(`${SERVER_URL}/auth/google/callback/?id=${token}`);
                console.log(userData.data);
            } catch (error) {
                console.log(error);
            }
        }

        getUserData(token);

    },[])
    return(
        <Layout>
            <SEO title="Categories" />
            <PageTemplate
                header = {
                <>
                    <h1>Login successfull</h1>
                    <Link to = {`/app/blogpost/${localStorage.getItem('currentPost')}`}>Back to post</Link>
                </>
                }
            />
        </Layout>
    )
}

export default LoginSuccessfull;