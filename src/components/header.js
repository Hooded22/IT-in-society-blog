import React, {useState} from 'react';
import { Link } from "gatsby"
import PropTypes from "prop-types"
import {RiMenu4Line, RiCloseLine} from "react-icons/ri"
import Image from "../components/image";
import logo from "../images/Logo3.svg";

import '../css/navbar.scss';

const pagesList = [
  {
    name: "Home",
    link: '/'
  },
  {
    name: "Stories",
    link: '/app/categories/Stories'
  },
  {
    name: 'Algo',
    link: '/app/categories/Algorithms'
  },
  {
    name: 'Lifestyle',
    link: '/app/categories/Lifestyle'
  },
  {
    name: 'About',
    link: '/about'
  }
]

const NavBarItems = (props) => {
  return props?.data.map((page) => (
    <li key = {page.name} className = "navbarItem"><Link to = {page.link} className = "navbarLink">{page.name}</Link></li>
  ))
}


const Header = ({ siteTitle }) => {

  const [mobileMenuDisplay, setMobileMenuDisplay] = useState("none");
  const [mobileMenuContentClass, setMobileMenuContentClass] = useState("");

  const openMenu = () => {
    setMobileMenuDisplay("flex");
    setTimeout(() => {
      setMobileMenuContentClass("show");
    },100)
    
  }

  const closeMenu = () => {
    setMobileMenuDisplay("none");
    setMobileMenuContentClass("");
  }


  return(
  <header className = "headerContainer">
    <div className = "leftSide">
      <img src={logo} />
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
      <div className = "navbarMobileMenuIcon">
          <RiMenu4Line
            size = {21}
            color = "#000"
            className = "icon"
            onClick = {openMenu}
          />
      </div>
      <div className = "navbarMobileContainer" style = {{display: mobileMenuDisplay}}>
        <div className = {`navbarMobileContent ${mobileMenuContentClass}`}>
            <button className = "header"
              onClick = {closeMenu}
            >
              <RiCloseLine
                size = {21}
                color = "#fff"
              />
            </button>
            <div className = "content">
              <ul>
                <NavBarItems data = {pagesList}/>
              </ul>
            </div>
        </div>
      </div>
    </div>
  </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
