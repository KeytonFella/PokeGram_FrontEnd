import React, { useEffect, useState } from 'react'
import './Navbar.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  //values from the global redux store
  const authState = useSelector((state: RootState) => state.auth);

  let [profile, setProfile] = useState({
      bio: '',
      image_url: ''
  });

  useEffect(() => {
    const USER_ID = authState.user_id;
    const URL = `http://52.90.96.133:5500/api/profiles/${USER_ID}`
    axios.get(URL, {headers: {Authorization: 'Bearer ' + authState.token}})
    .then(response => setProfile(response.data))
    .catch(err => console.log(err))
  }, [authState.token])
   
  return (
      <nav className="navbar sticky-top navbar-expand-xl navbar-light bg-light" id='navbar'>
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
              {
                authState.username && 
                <div className="container">
                  <div className="col">
                    <Link className="nav-item nav-link" to="/profiles">
                    <img src={profile.image_url} alt='profile-pic' className='navbar-profile-pic' />
                    {authState.username}
                    </Link>
                  </div>
                </div>
              }
              {
                !authState.username && 
                <>
                <Link className="nav-item nav-link" to="/login">Login</Link>
                <Link className="nav-item nav-link" to="/register">Register</Link>
                </>
              }
              </div>
              </div>
          </div>
      </nav>
  )
}

export default Navbar