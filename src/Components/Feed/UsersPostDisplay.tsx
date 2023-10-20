import React, { useState, useEffect, useRef } from 'react';
import  axios from 'axios';
//credit https://github.com/hc-oss/react-multi-select-component/blob/master/README.md
import './UsersPostDisplay.scss'; 
import IndivPost from './IndivPost'
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import {PostDataObject, UsersObject} from './Feed'

const UsersPostDisplay: React.FC<UsersObject> = ({user_id}) => {
    const AuthState = useSelector((state: RootState) => state.auth);
    const [username, setUsername] = useState<string>("Username Unavailable");
    const [profilePic, setProfilePic] = useState<string>("Username Unavailable");

    const [arr, setArr] = useState<PostDataObject[]>([])
    useEffect(() => {
        async function getUsersPosts(user_id: string) {
            if(user_id) {
                try {
                    const postsInfoResponse = await axios.get(`http://52.90.96.133:5500/api/post/user?user_id=${user_id}`, {
                        headers: { 
                            'Authorization': `Bearer ${AuthState.token}`,
                            'Content-Type': 'application/json'}
                    })
                    const profileInfo = await axios.get(`http://52.90.96.133:5500/api/profiles/${user_id}`, {
                        headers: { 
                            'Authorization': `Bearer ${AuthState.token}`,
                            'Content-Type': 'application/json'}
                    })
                    const usernameResponse = await axios.get(`http://52.90.96.133:5500/api/profiles/${user_id}/username`, {
                        headers: { 
                            'Authorization': `Bearer ${AuthState.token}`,
                            'Content-Type': 'application/json'}
                    })
                    setArr((prevData)  => [...prevData, ...postsInfoResponse.data.data]);
                    setUsername(usernameResponse.data.username);
                    setProfilePic(profileInfo.data.image_url)
                } catch(err) {
                    console.error("Can't get post Text:", err);
                }
            }
        }
        getUsersPosts(user_id);
    }, []);

    return (
        <div className='user_post_display'>
            {arr.map( (item: PostDataObject, index: number) => (
                <IndivPost key={index} username={username} profilePicUrl={profilePic} useridfk={user_id} text_body={item.text_body}  image_s3_id={item.image_s3_id}/>
            ))}
        </div>
    );
}
export default UsersPostDisplay;