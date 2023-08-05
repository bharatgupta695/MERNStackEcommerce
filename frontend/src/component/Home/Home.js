import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from '../Product/ProductCard.js';
import MetaData from "../layout/metaData";
import { clearErrors, getProducts } from '../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';



// const product  = {
//     _id: 1,
//     name:"Product 1",
//     price:100,
//     description:"This is a product",
//     images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
//     countInStock:10
// };

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {error, loading , products} = useSelector(
        state => state.products
        );
   
    useEffect(() => {
        if(error){
          alert.error(error);
          dispatch(clearErrors());
        }
        dispatch(getProducts());
    } , [dispatch,error,alert]);

  return  <Fragment>
    {loading ? <Loader/> : (<Fragment> 
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
              <ProductCard key={product._id} product={product} />
       )) } 
         </div>
    </Fragment>   )}
  </Fragment>
  
       }

export default Home