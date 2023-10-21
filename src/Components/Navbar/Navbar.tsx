import React, { useEffect, useState } from 'react'
import './Navbar.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  //values from the global redux store
  const authState = useSelector((state: RootState) => state.auth);
  const USER_ID = authState.user_id;
  const URL = `http://52.90.96.133:5500/api/profiles/${USER_ID}`
  

  //local
  /* const URL = `http://localhost:5500/api/profiles/${USER_ID}` */


  let [profile, setProfile] = useState({
      bio: '',
      image_url: ''
  });
  useEffect(() => {
    if(authState.token){
      const USER_ID = authState.user_id;
      const URL = `http://52.90.96.133:5500/api/profiles/${USER_ID}`
      axios.get(URL, {headers: {Authorization: 'Bearer ' + authState.token}})
      .then(response => setProfile(response.data))
      .catch(err => console.log(err))
    }
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
                
              <Link className="nav-item nav-link" to="/">
                <img className="navImage" src= {require("../../images/pikachu.png")} width={"40px"} height={"40px"}/>
                <h6>Home</h6>
              </Link>
              <Link className="nav-item nav-link" to="/posts">
                <img className="navImage" src= {require("../../images/post.png")} width={"40px"} height={"40px"}/>
                <h6>Posts</h6>
              </Link>
              <Link className="nav-item nav-link" to="/trades">
                <img className="navImage" src= {require("../../images/trades.png")} width={"40px"} height={"40px"}/>
                <h6>Trades</h6></Link>
              <Link className="nav-item nav-link" to="/users/:user_id/">
                <img className="navImage" src= {require("../../images/friends.png")} width={"45px"} height={"40px"}/>
                <h6>Friends</h6>
              </Link>
              {
                authState.username && 
                  <Link className="nav-item nav-link" to="/profiles">
                  <img src={profile.image_url} alt='profile-pic' className='navbar-profile-pic' width={"40px"} height={"40px"} />
                  <h6>{authState.username.charAt(0).toUpperCase() + authState.username.slice(1)}</h6>
                  </Link>
              }
              {
                !authState.username && 
                <>
                <Link className="nav-item nav-link" to="/login">
                  <img className="navImage" src= {require("../../images/loginIcon.png")} width={"45px"} height={"40px"}/>
                  <h6>Login</h6></Link>
                  <Link className="nav-item nav-link" to="/register">
                  <img className="navImage" src= {require("../../images/registerIcon.png")} width={"45px"} height={"40px"}/>
                  <h6>Register</h6></Link>
                </>
              }
              </div>
              </div>
          </div>
      </nav>
  )
}

export default Navbar