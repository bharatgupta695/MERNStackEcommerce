import React from 'react';
import playstore from "../../../images/playstore.png";
import Appstore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
        <div className="leftFooter">
         <h4> Download our App</h4>
         <p>Download our app for Android and IOS mobile phone</p>
           <img src={Appstore} alt="Appstore" />
            <img src={playstore} alt="playstore" />
        </div>

        <div className="midFooter">
            <h1>Ecommerce</h1>
            <p>High Quality is our first priority.</p>       
            
            <p>Copyrights 2023 &copy; Bharat</p>


        </div>

        <div className="rightFooter">
            <h4>Useful Links</h4>
            
            <a href="/">Instagram</a>
            <a href="/products">Twitter</a>
            <a href="/contact">Facebook</a>
         </div>
    </footer>
  )
}

export default Footer;