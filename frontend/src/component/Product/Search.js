import React from 'react'
import { useState,Fragment } from 'react';
import './Search.css'
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/metaData';
      const Search = () => {           //history is a prop passed from the router    ]
      const history = useNavigate();
    const [keyword,setKeyword] = useState('');

    const searchSubmitHandler = (e) => {
         console.log("eher");
        e.preventDefault(); 
        if(keyword.trim()){
           history(`/products/${keyword}`)
        
        } else {
           history('/products');
        }
    };

  return (
     <Fragment>
       <MetaData title={`Search a Product`}/>
       <form  className="searchBox" onSubmit={searchSubmitHandler} >
         <input type="text" placeholder="Search a Product..." 
           onChange = {(e) => setKeyword(e.target.value)} />
           <input type="submit" value="Search" />
       </form>
     </Fragment>
  )
}

export default Search