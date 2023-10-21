import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import Feed from "../Feed/Feed";

import './UserProfile.scss'
interface userProfileProps {
    postProfile: boolean;
}
//const BASE_API = `http://52.90.96.133:5500/api/profiles/${USER_ID}`;
const UserProfile: React.FC<userProfileProps> = ({postProfile}) => {
    const { profile_id } = useParams();
    const AuthState = useSelector((state: RootState) => state.auth);
    const [profilePic, setProfilePic] = useState<string>("UserProfile Unavailable");
    const [username, setUserName] = useState('Username not found');
    const [areFriends, setAreFriends] = useState(false);
    const [friendButtton, setFriendsButton] = useState(<></>);

    const on_hover_button = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.background = '#034480';
      }
    const on_leave_button = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.background = '#035096';
    }
    const on_hover_remove = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.background = 'red';
        e.currentTarget.innerHTML = '❌ Unfriend'
        e.currentTarget.style.borderColor= 'black';

      }
    const on_leave_remove = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.background = '#fff';
        e.currentTarget.innerHTML = '✔ Friends'
        e.currentTarget.style.borderColor= 'skyblue';

    }
  
    async function on_click_add(e: React.MouseEvent<HTMLButtonElement>){
        try{
            const response = await axios.get(`http://52.90.96.133:5500/api/users/${AuthState.user_id}}/friends`, {
                headers: { 
                    'Authorization': `Bearer ${AuthState.token}`,
                    'Content-Type': 'application/json'}
            })
            console.log(response);
        } catch(err){
            console.error(err);
        }
    }
    
    async function on_click_remove(e: React.MouseEvent<HTMLButtonElement>){
        try{
            console.log(profile_id);//21a4fe80-ce1d-42d0-8718-22e580940267
            console.log(AuthState.user_id);//5cafef44-7453-4381-8815-cd73e3fd037b
            const url = `http://52.90.96.133:5500/api/users/${AuthState.user_id}}/friends`;
            let body = {
                friend_key: profile_id,
                key_type: 'user_id'
            };
            let headers = {
                'Authorization': `Bearer ${AuthState.token}`,
                'Content-Type': 'application/json'
            }
            const response = await axios.delete(url, {headers, data: body});
            setAreFriends(false);
            console.log(response);
        } catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        async function getProfileInfo() {
            if(profile_id && !postProfile) {
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
            else if(postProfile) {
                try {                
                    const profileInfo = await axios.get(`http://52.90.96.133:5500/api/profiles/${AuthState.user_id}`, {
                        headers: { 
                            'Authorization': `Bearer ${AuthState.token}`,
                            'Content-Type': 'application/json'}
                    })
                    profileInfo.data.image_url ? setProfilePic(profileInfo.data.image_url) : setProfilePic(require("../../images/default_pp.jpg"));
                } catch(err) {
                    console.error("Can't get post Text:", err);
                }
            }
        }
        getProfileInfo();
    }, []);
    useEffect(() => {
        function changeButton() {
            if (AuthState.user_id != profile_id && !areFriends && !postProfile) {// add friend button
                setFriendsButton(<div id="add-friend">
                                    <button className="btn btn-info" id="add-friend-btn" onMouseOver={on_hover_button} onMouseLeave={on_leave_button} onClick={on_click_add}>+ Add Friend</button>
                                </div>) ;
            } else if (AuthState.user_id != profile_id && areFriends && !postProfile) {//remove friend button
                setFriendsButton(<div id="add-friend">
                                    <button className="btn btn-info" id="remove-friend-btn" onMouseOver={on_hover_remove} onMouseLeave={on_leave_remove} onClick={on_click_remove}> ✔ Friends</button>
                                </div>);
            } else {//empty
                setFriendsButton(<></>);
            } 
        }
        changeButton();
    }, [areFriends]);
    //todo: add friends with checkmark on it. and have it change upon removing friend or adding them
   
    return (
        <div id = "user-profile-page-container">
            <div id='profile-top'>
                <div id='profile-info-containter'>
                    <div id="user-profile-image-containter">
                        <img src={profilePic} alt={`pic not found for ${username}`} id='profile_pic'/>
                    </div>
                    <div id="user-profile-name-containter">
                        <h2>{postProfile ? AuthState.username : username}</h2>
                    </div>
                </div>
                <div id="add-friend-container">
                    {friendButtton}
                </div>
            </div>
            <div id="bottom_container">
                <div id="team-container">

                </div>
                <div id="post-container">
                    <Feed social_bool={false} user_id_in={postProfile ? AuthState.user_id : profile_id}/>
                </div>
            </div>
        </div>
        
    );
}

export default UserProfile;