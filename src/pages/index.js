import React from "react"

import "../css/mainPage.css";

import Layout from "../components/layout"
import SEO from "../components/seo"
import AuthorCard from '../components/authorCard'
import CategoriesBar from "../components/categoriesBar";
import PostsList from "../components/postsList";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <AuthorCard/>
    <CategoriesBar/>
    <PostsList/>
  </Layout>
)

export default IndexPage
