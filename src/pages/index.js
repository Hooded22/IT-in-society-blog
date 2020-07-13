import React from "react"
import { Link, graphql } from "gatsby"
import {
  FaLinkedin,
  FaInstagram,
  FaGithub
} from 'react-icons/fa'

import SocialIcons from "../components/socialIcons";

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className = "header">
      <div className = "leftSide">
        <Image name = "profileImage" wrapperStyle = {{width: '120px', borderRadius: '50%', height: '120px', margin: 0}} imgStyle = {{objectPosition: 'center 0.1px', margin: 0}}/>
      </div>
      <div className = "rigthSide">
        <h1>BIG TITLE ABOUT BLOG</h1>
        <h2>My name is ......</h2>
        <h3>Follow me on</h3>
        <SocialIcons
          size = {16}
          color = "#000"
          width = "40%"
        />
      </div>
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

export default IndexPage
