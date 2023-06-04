import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from './Product.js';
import MetaData from "../layout/metaData";
import { getProducts } from '../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';



// const product  = {
//     _id: 1,
//     name:"Product 1",
//     price:100,
//     description:"This is a product",
//     images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
//     countInStock:10
// };

const Home = () => {
   
    const dispatch = useDispatch();
    const {error, loading , products, productsCount} = useSelector(
        state => state.products
        );

    useEffect(() => {
        dispatch(getProducts());
    } , [dispatch]);

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
       {products && products.map(product => (
              <Product key={product._id} product={product} />
       )) } 
         </div>
    </Fragment>   
  
}

export default Home