import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import './UserProfile.scss'

const USER_ID = 1;
const BASE_API = `http://52.90.96.133:5500/api/profiles/${USER_ID}`;

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
        </div>
        
    );
}

export default UserProfile;