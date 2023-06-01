import React, { Fragment } from 'react'
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from './Product.js';
import MetaData from "../layout/MetaData";

const product  = {
    _id: 1,
    name:"Product 1",
    price:100,
    description:"This is a product",
    images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
    countInStock:10
};

const Home = () => {
  return  <Fragment> 
    <MetaData title = "ECOMMERCE" />
    <div className="banner"> 
    <p>Welcome to Ecommerce</p>
    <h1>Find Amazing Products Below</h1>
     

     <a href ="#container">
        <button >
            Scroll <CgMouse/> 
            </button>
     </a>
    </div>
    <h2 className='homeHeading'>Featured Products</h2>
    <div className="container" id="container">
        <Product product = {product}/>
        <Product product = {product}/>
        <Product product = {product}/>
        <Product product = {product}/>

        <Product product = {product}/>
        <Product product = {product}/>
        <Product product = {product}/>
        <Product product = {product}/>
         </div>
    </Fragment>   
  
}

export default Home