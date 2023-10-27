import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import Feed from "../Feed/Feed";

import './UserProfile.scss'
import MessageModal from '../MessageModal/MessageModal';
import Team from '../Team/Team';

const UserProfile: React.FC = () => {
    const { profile_id } = useParams();
    const AuthState = useSelector((state: RootState) => state.auth);
    const [profilePicUser, setProfilePic] = useState<string>("UserProfile Unavailable");
    const [username, setUserName] = useState<string | null>('Username not found');
    const [bio, setBioState] = useState('');
    const [areFriends, setAreFriends] = useState(false);
    const [buttonState , setButtonState ] = useState('add-friend');
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
            const url = `https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/users/${AuthState.user_id}/friends`;
            let body = {
                friend_key: profile_id,
                key_type: 'user_id'
            };
            let headers = {
                'Authorization': AuthState.token,
                'Content-Type': 'application/json'
            }
            const response = await axios.put(url, body, {headers});
            setAreFriends(true);
        } catch(err){
            console.error(err);
        }
    }
    async function on_click_remove(e: React.MouseEvent<HTMLButtonElement>){
        try{
            const url = `https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/users/${AuthState.user_id}/friends`;
            let body = {
                friend_key: profile_id,
                key_type: 'user_id'
            };
            let headers = {
                'Authorization': AuthState.token,
                'Content-Type': 'application/json'
            }
            const response = await axios.delete(url, { headers, data: body });
            setAreFriends(false);
        } catch(err){
            console.error(err);
        }
    }
    useEffect(() => {
        async function getProfileInfo() {
            try{
                if(profile_id !== AuthState.user_id) {// not our own profile, we can look for frineds
                    const friendsList = await axios.get(`https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/users/${AuthState.user_id}/friends`, {
                        headers: { 
                            'Authorization': AuthState.token,
                            'Content-Type': 'application/json'}
                    });
                    for (const friend of friendsList.data.friendsList) {
                        if(friend.user_id === profile_id) {
                            setAreFriends(true);
                        }
                    }
                }else{
                    setAreFriends(false);
                }
                const profileInfo = await axios.get(`https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/profiles/${profile_id}`, {
                    headers: { 
                        'Authorization': AuthState.token,
                        'Content-Type': 'application/json'}
                })
                const usernameResponse = await axios.get(`https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/profiles/${profile_id}/username`, {
                    headers: { 
                        'Authorization': AuthState.token,
                        'Content-Type': 'application/json'}
                })
              
                setBioState(profileInfo.data.bio)
                setProfilePic(profileInfo.data.image_url);
                setUserName(usernameResponse.data.username);
            }
            catch(err){
                console.error(err);
            }
        }
        getProfileInfo();
    }, [profile_id]);

    useEffect(() => {
        function changeButton() {
            if (AuthState.user_id != profile_id && !areFriends ) {// add friend button
                setButtonState('add-friend');
            } else if (AuthState.user_id != profile_id && areFriends) {//remove friend button
                setButtonState('remove-friend');
            } else {//empty
                setButtonState('empty');
            } 
        }
        changeButton();
    }, [areFriends, profile_id]);
    return (
        <div id = "user-profile-page-container">
            <div id='profile-top'>
                <div id='profile-info-containter'>
                    <div className="info user-profile-image-containter">
                        <img key = {Date.now()} src={profilePicUser} alt={`pic not found for ${username}`} id='profile_pic'/>
                    </div>
                    <div  className="info user-profile-name-containter">
                        <h2>{profile_id == AuthState.user_id ? AuthState.username : username}</h2>
                    </div>
                    <div key = {Date.now()}  className="info user-profile-bio-container">
                        {bio ?`${bio}`: "No Bio"}
                    </div>
                </div>
                <div key = {Date.now()} id="add-friend-container">
                {buttonState === 'add-friend' && (
                    <div key = {Date.now()} id="add-friend">
                        <button
                            key = {Date.now()}
                            className="btn btn-info add-friend-btn"
                            style= {{ background: '#035096'}}
                            onMouseOver={on_hover_button}
                            onMouseLeave={on_leave_button}
                            onClick={on_click_add}
                        >
                            + Add Friend
                        </button>
                    </div>
                    )}
                {buttonState === 'remove-friend' && (
                <div key = {Date.now()}  id="add-friend">
                    <button
                    key = {Date.now()}
                        className="btn btn-info remove-friend-btn"
                        onMouseOver={on_hover_remove}
                        style= {{ background: '#fff'}}
                        onMouseLeave={on_leave_remove}
                        onClick={on_click_remove}
                    >
                        ✔ Friends
                    </button>
                </div>
                )}
                {buttonState === 'empty' && <></>}
                {profile_id !== AuthState.user_id ? <MessageModal username={profile_id}/> : <></>}
            </div>
            </div>
            <div id="bottom_container">
                <div id="team-container">
                    <Team team_user_id={profile_id}/>
                </div>
                <div id="post-container">
                    <Feed social_bool={false} user_id_in={profile_id}/>
                </div>
            </div>
        </div>
        
    );
}

export default UserProfile;