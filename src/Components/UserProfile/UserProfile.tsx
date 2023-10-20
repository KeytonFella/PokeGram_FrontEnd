import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Feed from "../Feed/Feed";

import './UserProfile.scss'

//const BASE_API = `http://52.90.96.133:5500/api/profiles/${USER_ID}`;

function UserProfile() {
    const { profile_id } = useParams();

    return (
        <div id = "user-profile-page-container">
            <div id='profile-info-containter'>
                <div id="user-profile-image-containter">
                    <img src={require("../../images/default_pp.jpg")} alt={`Profile of ${profile_id}`} id='profile_pic'/>
                </div>
                <div id="user-profile-name-containter">
                    <h2>{profile_id}</h2>
                </div>
            </div>
            <div id="bottom_container">
                <div id="team-container">

                </div>
                <div id="post-container">
                    <Feed/>
                </div>
            </div>
        </div>
        
    );
}

export default UserProfile;