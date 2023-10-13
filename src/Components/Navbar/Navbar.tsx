import React from 'react'
import Home from '../../pages/Home';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      
        <a className="navbar-brand" href="#">PokeGram</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            <a className="nav-item nav-link active" href="/">Home<span className="sr-only"></span></a>
            <a className="nav-item nav-link" href="/posts">Posts</a>
            <a className="nav-item nav-link" href="/trades">Trades</a>
            <a className="nav-item nav-link" href="/login">Login</a>
            <a className="nav-item nav-link" href="/register">Register</a>
            </div>
        </div>
    </nav>   
  )
}

export default Navbar