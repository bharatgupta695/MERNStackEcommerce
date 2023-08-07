import './App.css';
import Header from "./component/layout/Header/Header.js";
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import webfont from "webfontloader";
import React from 'react';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Product from './component/Product/Product.js';
import Search from './component/Product/Search.js';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store';
import {loadUser} from './actions/userAction';
import {useSelector} from 'react-redux';
import UserOptions from './component/layout/Header/UserOptions';

function App() {  
  const { isAuthenticated, user } = useSelector((state) => state.user);
React.useEffect(() => {
  webfont.load({
    google: {
      families: ['Roboto', 'Droid Sans', 'Chilanka']
    }
  });

   store.dispatch(loadUser());  

},[]);
  return (
    <Router>
     <Header />
     {isAuthenticated && <UserOptions user={user} />}
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/products' element = {<Product/>}  />
      <Route path='/search' element = {<Search/>}  />
      <Route path="/products/:keyword" element = {<Product/>}  />
      <Route path="/login" element = {<LoginSignUp/>}  />
      </Routes>
     <Footer/>
     </Router>
  );
}

export default App;
