import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import '../css/header.css';

const pagesList = [
  {
    name: "Home",
    link: '/home'
  },
  {
    name: "Stories",
    link: '/categories/stories'
  },
  {
    name: 'Algo',
    link: '/categories/algo'
  },
  {
    name: 'Lifestyle',
    link: '/categories/lifestyle'
  },
  {
    name: 'About',
    link: 'about'
  }
]

const NavBarItems = (props) => {
  return props.data.map((page) => (
    <li className = "navbarItem"><Link to = {page.link} className = "navbarLink">{page.name}</Link></li>
  ))
}


const Header = ({ siteTitle }) => (
  <header className = "headerContainer">
    <div className = "leftSide">
      <h1 style={{ margin: 0,}}>
        <Link
          to="/"
          className = "blogTitle"
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <div className = "rightSide">
      <ul className = "navbarContainer">
        <NavBarItems data = {pagesList}/>
      </ul>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
