import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import Feed from "../Feed/Feed";

import './UserProfile.scss'
import MessageModal from '../MessageModal/MessageModal';
import Team from '../Team/Team';
interface userProfileProps {
    postProfile: boolean;
}
//const BASE_API = `http://52.90.96.133:5500/api/profiles/${USER_ID}`;
const UserProfile: React.FC<userProfileProps> = ({postProfile}) => {
    console.log(postProfile);
    let { profile_id } = useParams();
    const [profilePathState, setprofilePathStateState] = useState<string|null|undefined>(profile_id);
  
    const AuthState = useSelector((state: RootState) => state.auth);
    const [profilePic, setProfilePic] = useState<string>("UserProfile Unavailable");
    const [username, setUserName] = useState<string | null>('Username not found');
    const [bio, setBioState] = useState('');
    const [areFriends, setAreFriends] = useState(false);
    const [buttonState , setButtonState ] = useState('add-friend');
    console.log(
        "profilePic: ",profilePic,
        "username: ",username,
        "profilePathState: ",profilePathState,
        "postProfile: ",postProfile)

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
            const url = `http://52.90.96.133:5500/api/users/${AuthState.user_id}/friends`;
            let body = {
                friend_key: profilePathState,
                key_type: 'user_id'
            };
            let headers = {
                'Authorization': `Bearer ${AuthState.token}`,
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
            const url = `http://52.90.96.133:5500/api/users/${AuthState.user_id}/friends`;
            let body = {
                friend_key: profilePathState,
                key_type: 'user_id'
            };
            let headers = {
                'Authorization': `Bearer ${AuthState.token}`,
                'Content-Type': 'application/json'
            }
            const response = await axios.delete(url, { headers, data: body });
            //e.currentTarget.style.background = '#035096';
            setAreFriends(false);
        } catch(err){
            console.error(err);
        }
    }
    useEffect(() => {
        async function getProfileInfo() {
            try{

                if(postProfile){
                    setAreFriends(false);
                    setprofilePathStateState(AuthState.user_id)
                }

                if(profilePathState != AuthState.user_id && !postProfile) {// not our own profile, we can look for frineds
                    const friendsList = await axios.get(`http://52.90.96.133:5500/api/users/${AuthState.user_id}/friends`, {
                        headers: { 
                            'Authorization': `Bearer ${AuthState.token}`,
                            'Content-Type': 'application/json'}
                    });
                    for (const friend of friendsList.data.friendsList) {
                        if(friend.user_id == profilePathState) {
                            setAreFriends(true);
                        }
                    }
                }
                const profileInfo = await axios.get(`http://52.90.96.133:5500/api/profiles/${profilePathState}`, {
                    headers: { 
                        'Authorization': `Bearer ${AuthState.token}`,
                        'Content-Type': 'application/json'}
                })
                const usernameResponse = await axios.get(`http://52.90.96.133:5500/api/profiles/${profilePathState}/username`, {
                    headers: { 
                        'Authorization': `Bearer ${AuthState.token}`,
                        'Content-Type': 'application/json'}
                })
                console.log(profileInfo)
                setBioState(profileInfo.data.bio)
                setProfilePic(profileInfo.data.image_url);
                setUserName(usernameResponse.data.username);
            }
            catch(err){
                console.error(err);
            }
        }
        getProfileInfo();
        console.log("getProfileInfo called")

    }, [postProfile, profilePathState]);

    useEffect(() => {
        function changeButton() {
            if (AuthState.user_id != profilePathState && !areFriends && !postProfile) {// add friend button
                setButtonState('add-friend');
            } else if (AuthState.user_id != profilePathState && areFriends && !postProfile) {//remove friend button
                setButtonState('remove-friend');
            } else {//empty
                setButtonState('empty');
            } 
        }
        changeButton();
    }, [areFriends]);
    return (
        <div id = "user-profile-page-container">
            <div id='profile-top'>
                <div id='profile-info-containter'>
                    <div className="info user-profile-image-containter">
                        <img key = {Date.now()} src={profilePic} alt={`pic not found for ${username}`} id='profile_pic'/>
                    </div>
                    <div  className="info user-profile-name-containter">
                        <h2>{postProfile ? AuthState.username : username}</h2>
                    </div>
                    <div key = {Date.now()}  className="info user-profile-bio-container">
                        {bio ?`${bio}`: "No Bio"}
                    </div>
                </div>
                <div  id="add-friend-container">
                {buttonState === 'add-friend' && (
                    <div id="add-friend">
                        <button
                            className="btn btn-info add-friend-btn"
                            onMouseOver={on_hover_button}
                            onMouseLeave={on_leave_button}
                            onClick={on_click_add}
                        >
                            + Add Friend
                        </button>
                    </div>
                    )}
                {buttonState === 'remove-friend' && (
                <div id="add-friend">
                    <button
                        className="btn btn-info remove-friend-btn"
                        onMouseOver={on_hover_remove}
                        onMouseLeave={on_leave_remove}
                        onClick={on_click_remove}
                    >
                        ✔ Friends
                    </button>
                </div>
                )}
                {buttonState === 'empty' && <></>}
            </div>
            <MessageModal username={profile_id}/>
            </div>
            <div id="bottom_container">
                <div id="team-container">
                    <Team key = {Date.now()} team_user_id={profilePathState}/>
                </div>
                <div id="post-container">
                    <Feed key = {Date.now()} social_bool={false} user_id_in={profilePathState}/>
                </div>
            </div>
        </div>
        
    );
}

export default UserProfile;