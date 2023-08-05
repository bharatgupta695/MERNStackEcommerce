import React, { Fragment, useEffect, useState} from 'react'
import Loader from '../layout/Loader/Loader'
import ProductCard from './ProductCard'
import {useSelector,useDispatch} from 'react-redux'
import { clearErrors, getProducts } from '../../actions/productAction'
import './Product.css'
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography  from "@material-ui/core/Typography";
import MetaData from "../layout/metaData";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Product = () => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const [currentPage, setCurrentPage ] = useState(1); 
    const [price, setPrice] = useState([0, 250000]); 
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const {loading,products,error, productsCount, resultPerPage,filteredProductsCount } = useSelector(state => state.products);
    // console.log(productsCount, resultPerPage);
    const {keyword}  =useParams();
    
    const priceHandler = (event, newPrice ) => {
           setPrice(newPrice); 
    }  

    const setCurrentPageNo = (e) => {
          setCurrentPage(e); 
    }
      console.log(keyword, "here");
   useEffect(() => {
       if(error){
        alert.error(error);
        dispatch(clearErrors());
       }
       dispatch(getProducts(keyword,currentPage,price,category,ratings));
   },[dispatch,keyword,currentPage,price,category,ratings,error,alert])

  //  let count = filteredProductsCount
  return (
    <Fragment>
        {loading ? <Loader /> : 
        <Fragment>
          <MetaData title={'Buy Best Products Online'} />
           <h2 className="productsHeading">Products</h2>
            <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="filterBox">
              <Typography>Price</Typography>
              <Slider 
                value = {price}
                onChange={priceHandler}
                valueLabelDisplay='auto'
                aria-labelledby="range-slider"
                min={0}  
                max={25000}
                 />
                 <Typography>category</Typography>
                 <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
            </div> 

            {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
            )}

        </Fragment>}
    </Fragment>
  )
}

export default Product