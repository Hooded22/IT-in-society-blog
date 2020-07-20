import React from "react"

import "../css/mainPage.scss";

import Layout from "../components/layout"
import SEO from "../components/seo"
import AuthorCard from '../components/authorCard'
import CategoriesBar from "../components/categoriesBar";
import {DefaulPostList} from "../components/postsList";
import SideColumn from "../components/sideColumn";

const IndexPage = (props) => (
  <Layout>
    <SEO title="Home" />
    <AuthorCard/>
    <CategoriesBar/>
    <div style = {{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }}>
      <DefaulPostList pageNumber = {props.pageNumber} link = "/app/page/" postsLimit = {3}/>
      <SideColumn/>
    </div>
  </Layout>
)

export default IndexPage
