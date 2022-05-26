import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes, Link} from "react-router-dom"

import {Nav, Navbar, Container} from 'react-bootstrap';
import './App.css';

import Signup from './forms/SignUp';
import Login from './forms/Login';
import Home from './pages/Home.js';
import Where from './pages/Where.js';
import Catalog from './pages/Catalog.js';
import About from './pages/About.js';
import AdminBoard from './pages/AdminBoard.js'
import ProductAdd from './forms/productAdd.js'
import CategoryAdd from './forms/categoryAdd.js'
import CategoryEdit from './forms/categoryEdit';
import ProductEdit from './forms/productEdit';
import Cart from './pages/Cart.js';

import Authentification from './service/authentification';

const App = () => {
  
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined)
  const [number, setNumber] = useState([])

  useEffect(() => {
    const user = Authentification.getCurrentUser();
    if (user){
      setCurrentUser(user);
      setShowAdmin(user.roles.includes("admin"));
    }
    const cart = (JSON.parse(localStorage.getItem("cart")))
    if (cart !== null) {
        setNumber(cart);
    }
    
  }, [setCurrentUser])

  const logOut = () => Authentification.logout();

  return (
    <BrowserRouter>
      <Navbar className='navigation' collapseOnSelect expand="lg" >
        <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Link className='nav-link' to={'/'}>Главная</Link>
                    <Link className='nav-link' to={'/about'}>О нас</Link>
                    <Link className='nav-link' to={'/products'}>Каталог</Link>
                    <Link className='nav-link' to={'/where'}>Где нас найти</Link>
                {showAdmin && (

                  <Link className='nav-link' to={'/admin'}>Панель управления</Link>

                )}                
                </Nav>                


                {currentUser ? (
                  <Nav>
                    <Link className='nav-link' to={'/cart'}>Корзина</Link>
                    <Nav.Link className='nav-link' href={'/'} onClick={() => logOut()}>Выйти</Nav.Link>
                  </Nav>
                ):(
                  <Nav>
                    <Link className='nav-link' to={'/login'}>Вход</Link>
                    <Link className='nav-link' to={'/signup'}>Регистрация</Link>
                  </Nav>
                )}

              </Navbar.Collapse>
        </Container>
      </Navbar>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/products" element={<Catalog />} />
        <Route path="/where" element={<Where />} />
        <Route path="/about" element={<About />} />
        
        <Route path="/admin" element={<AdminBoard />} />

        <Route path="/products/add" element={<ProductAdd />} />
        <Route path="/categorys/add" element={<CategoryAdd />} />        
        <Route path="/categorys/edit" element={<CategoryEdit />} />
        <Route path="/products/edit" element={<ProductEdit />} />

        <Route path="/cart" element={<Cart />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
