import React from 'react'
import Home from '../Home/Home';
import './Navbar.scss';

function Navbar() {

  return (
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light" id='navbar'>
        <div className="container">
          <a className="navbar-brand" href="/">
          <img src= {require("../../images/pokegram.png")} alt ="pokegram logo" id="brand_img" width={"240px"} height={"60px"}/>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
              <a className="nav-item nav-link" href="/">Home<span className="sr-only"></span></a>
              <a className="nav-item nav-link" href="/posts">Posts</a>
              <a className="nav-item nav-link" href="/trades">Trades</a>
              <a className="nav-item nav-link" href="/login">Login</a>
              <a className="nav-item nav-link" href="/register">Register</a>
              </div>
          </div>
          </div>
      </nav>
  )
}

export default Navbar