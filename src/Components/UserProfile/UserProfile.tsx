import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import { Friend } from '../Feed/Feed';
import Feed from "../Feed/Feed";

import './UserProfile.scss'

//const BASE_API = `http://52.90.96.133:5500/api/profiles/${USER_ID}`;

function UserProfile() {
    const { profile_id } = useParams();
    const AuthState = useSelector((state: RootState) => state.auth);
    const [profilePic, setProfilePic] = useState<string>("UserProfile Unavailable");
    const [username, setUserName] = useState('Username not found');
    const [areFriends, setAreFriends] = useState(false);
    const on_hover_button = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.background = '#034480';
      }
    const on_leave_button = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.background = '#035096';
    }
    async function on_click_add(e: React.MouseEvent<HTMLButtonElement>){
        const response = await axios.get(`http://52.90.96.133:5500/api/users/${AuthState.user_id}}/friends`, {
            headers: { 
                'Authorization': `Bearer ${AuthState.token}`,
                'Content-Type': 'application/json'}
        })
        console.log(response);
    }

    useEffect(() => {
        async function getProfileInfo() {
            if(profile_id) {
                try {                
                    const profileInfo = await axios.get(`http://52.90.96.133:5500/api/profiles/${profile_id}`, {
                        headers: { 
                            'Authorization': `Bearer ${AuthState.token}`,
                            'Content-Type': 'application/json'}
                    })
                    const usernameResponse = await axios.get(`http://52.90.96.133:5500/api/profiles/${profile_id}/username`, {
                        headers: { 
                            'Authorization': `Bearer ${AuthState.token}`,
                            'Content-Type': 'application/json'}
                    })
                    const friendsList = await axios.get(`http://52.90.96.133:5500/api/users/${AuthState.user_id}/friends`, {
                        headers: { 
                            'Authorization': `Bearer ${AuthState.token}`,
                            'Content-Type': 'application/json'}
                    });
                    profileInfo.data.image_url ? setProfilePic(profileInfo.data.image_url) : setProfilePic(require("../../images/default_pp.jpg"));
                    for (const friend of friendsList.data.friendsList) {
                        if(friend.user_id == profile_id) {
                            setAreFriends(true);
                        }
                      }
                    setUserName(usernameResponse.data.username);
                } catch(err) {
                    console.error("Can't get post Text:", err);
                }
            }
        }
        getProfileInfo();
    }, []);
    //todo: add friends with checkmark on it. and have it change upon removing friend or adding them
    return (
        <div id = "user-profile-page-container">
            <div id='profile-top'>
                <div id='profile-info-containter'>
                    <div id="user-profile-image-containter">
                        <img src={profilePic} alt={`pic not found for ${username}`} id='profile_pic'/>
                    </div>
                    <div id="user-profile-name-containter">
                        <h2>{username}</h2>
                    </div>
                </div>
                <div id="add-friend-container">
                    {(AuthState.user_id != profile_id && !areFriends) ? 
                    <div id="add-friend">
                        <button className="btn btn-info" id="add-friend-btn" onMouseOver={on_hover_button} onMouseLeave={on_leave_button} onClick={on_click_add}>Add Friend</button>
                    </div> 
                    :<></>} 
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