import React, { useEffect, useState } from 'react'
import './Navbar.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  //values from the global redux store
  const authState = useSelector((state: RootState) => state.auth);
  const [updateNavbar, setUpdateNavbar] = useState(0);
  let [profile, setProfile] = useState({
    bio: '',  
    image_url: ''
  });

  function updatePic(){
    setUpdateNavbar(updateNavbar + 1);
  }

  useEffect(() => {
    if(authState.token){
      const USER_ID = authState.user_id;
      const URL = `https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/profiles/${USER_ID}`
      axios.get(URL, {headers: {Authorization: authState.token}})
      .then(response => {setProfile(response.data); console.log(response.data)})
      .catch(err => console.log(err))
    }
  }, [authState.token, updateNavbar])
   
  return (
      <nav className="navbar sticky-top navbar-expand-xl navbar-light bg-light" id='navbar'>
        <div className="container" onClick={updatePic}>
          <Link className="navbar-brand" to="/">
          <img src= {require("../../images/pokegram.png")} alt ="pokegram logo" id="brand_img" width={"240px"} height={"60px"}/>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
              <div className="navbar-nav">
                
              <Link className="nav-item nav-link" to="/">
                <div className="container">
                <img className="navImage" src= {require("../../images/pikachu.png")} width={"40px"} height={"40px"}/>
                <h6>Home</h6>
                </div>
              </Link>
              <Link className="nav-item nav-link" to="/posts">
                <div className="container">
                <img className="navImage" src= {require("../../images/post.png")} width={"40px"} height={"40px"}/>
                <h6>Posts</h6>
                </div>
              </Link>
              <Link className="nav-item nav-link" to="/trades">
                <div className="container">
                <img className="navImage" src= {require("../../images/trades.png")} width={"40px"} height={"40px"}/>
                <h6>Trades</h6>
                </div>
              </Link>
              <Link className="nav-item nav-link" to="/friends">
                <div className="container">
                <img className="navImage" src= {require("../../images/friends.png")} width={"45px"} height={"40px"}/>
                <h6>Friends</h6>
                </div>
              </Link>
              {
                authState.username && 
                <>
                  <Link className="nav-item nav-link" to="/messages">
                    <div className="container">
                    <img className="navImage" src= {require("../../images/messagesIcon.png")} width={"45px"} height={"40px"}/>
                    <h6>Messages</h6>
                    </div>
                  </Link>
                  <Link className="nav-item nav-link" to="/profiles">
                    <div className="container">
                    <img src={profile.image_url} alt='profile-pic' className='navbar-profile-pic' width={"40px"} height={"40px"} />
                    <h6>{authState.username.charAt(0).toUpperCase() + authState.username.slice(1)}</h6>
                    </div>
                  </Link>
                </>
              }
              {
                !authState.username && 
                <>
                <Link className="nav-item nav-link" to="/login">
                  <div className="container">
                  <img className="navImage" src= {require("../../images/loginIcon.png")} width={"45px"} height={"40px"}/>
                  <h6>Login</h6>
                  </div>
                </Link>
                <Link className="nav-item nav-link" to="/register">
                  <div className="container">
                  <img className="navImage" src= {require("../../images/registerIcon.png")} width={"45px"} height={"40px"}/>
                  <h6>Register</h6>
                  </div>
                </Link>
                </>
              }
              </div>
              </div>
          </div>
      </nav>
  )
}

export default Navbar