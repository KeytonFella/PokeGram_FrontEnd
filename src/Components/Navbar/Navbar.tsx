import React, { useEffect } from 'react'
import Home from '../Home/Home';
import './Navbar.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import { Link } from 'react-router-dom';

function Navbar() {
  //values from the global redux store
  const authState = useSelector((state: RootState) => state.auth);
   
  return (
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light" id='navbar'>
        <div className="container">
          <Link className="navbar-brand" to="/">
          <img src= {require("../../images/pokegram.png")} alt ="pokegram logo" id="brand_img" width={"240px"} height={"60px"}/>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/">Home<span className="sr-only"></span></Link>
              <Link className="nav-item nav-link" to="/posts">Posts</Link>
              <Link className="nav-item nav-link" to="/trades">Trades</Link>
              <Link className="nav-item nav-link" to="/login">Login</Link>
              <Link className="nav-item nav-link" to="/register">Register</Link>
              <Link className="nav-item nav-link" to="/friends">Friends</Link>

              </div>
          </div>
          </div>
      </nav>
  )
}

export default Navbar