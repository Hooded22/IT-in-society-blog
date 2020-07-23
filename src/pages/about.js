import React from 'react';
import PageTemplate from "../components/pageTemplates/headerAndContent";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Image from "../components/image"

import "../css/about.scss";

const wrapperStyle = {width: "160px", height: "160px", borderRadius: "50%", position: "relative", overflow: "hidden", shapeOutside: "circle()", margin: "20px"}
const imageStyle = {position: 'absolute', top: 0, left: 0, objectFit: "cover", width: '100%', heigth: "100%", objectPosition: "0 0.1px"}

const Content = () => {
    return(
        <div className = "aboutMe">
        <div className = "content">
            <div className = "bioWrapper">
                <Image name = "profileImage" className = "imageWrapper" wrapperStyle = {{}} imgStyle = {imageStyle}/>
                <div className = "bioSection">
                    <h1>Przemek Sipta</h1>
                    <p>Cześć, jak już zdążyłeś zauważyć nazywam się Przemek i tak się składa, że prowadzę tego bloga. <span role="img">😉</span>. Jestem początkującym programistą Front-end z zapatrywaniami na Fullstack. Aktualnie buduję prężnie swoje portfolio i staram się rozwijać w każdym możliwym kierunku.Ten blog również jest częścią mojego portfolio, wykonany został z użyciem Gatsby.js oraz Strapi. Cały kod można znaleźć na moim GitHubie. Programuję głównie w Javascript i C++, uwielbiam pracę z React`em i Node.js. W wolnej chwili szukam pierwszej pracy <span role="img">😁</span>. Na co dzień studiuję zawzięcie na Politechnice Lubelskiej kierunek, rozwijam się jako pisarz amator i staram dbać o siebie i swoje ciało trenując kalistenikę. Bardzo cieszę się, że zawitałeś na moim blogu. Żywię nadzieję, iż będziesz się tu dobrze bawił. <span role="img">😉</span> </p>
                </div>
            </div>
        </div>
    </div>
    )
}

const AboutMe = () => {
    return(
        <Layout>
            <SEO title = "About me"/>
                <PageTemplate
                    header = {<h1>Hello</h1>}
                    content = {<Content/>}
                />
        </Layout>
    )
}

export default AboutMe;