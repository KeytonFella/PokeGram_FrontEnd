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
    //console.log("AuthState: ", AuthState);

    const [posts, setPosts] = useState<PostDataObject[]>([])
    useEffect(() => {
        async function getUsersPosts(user_id: string | null | undefined) {
            if(user_id) {
                try {
                    const postsInfoResponse = await axios.get(`https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/posts/${user_id}`, {
                        headers: { 
                            'Authorization': AuthState.token,
                            'Content-Type': 'application/json'}
                    })
                    const profileInfo = await axios.get(`https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/profiles/${user_id}`, {
                        headers: { 
                            'Authorization': AuthState.token,
                            'Content-Type': 'application/json'}
                    })
                    const usernameResponse = await axios.get(`https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/profiles/${user_id}}/username`, {
                        headers: { 
                            'Authorization': AuthState.token,
                            'Content-Type': 'application/json'
                        }
                    })
                    console.log("Userid: ", user_id);
                    console.log("profileInfo", profileInfo);
                    setPosts((prevData)  => [...prevData, ...postsInfoResponse.data.body.data.Items]);
                    setUsername(usernameResponse.data.username);
                    setProfilePic(profileInfo.data.image_url)
                } catch(err) {
                    console.error("Can't get post:", err);
                }
            }
        }
        getUsersPosts(user_id);
    }, [user_id]);
    return (
        <div className='user_post_display'>
            {posts.reverse().map( (item: PostDataObject, index: number) => (
                <IndivPost key={index} username={username} profilePicUrl={profilePic} useridfk={user_id} text_body={item.text_body}  image_s3_id={item.image_s3_id} tags={item.tags}/>
            ))}
        </div>
    );
}
export default UsersPostDisplay;