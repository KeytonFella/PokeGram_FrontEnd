import React, {useState, useEffect} from 'react';
import  axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
//import { useDispatch } from 'react-redux';
//import { setUserInfo } from '../../utility/auth';
//import { AppDispatch } from '../../utility/store';
//credit https://github.com/hc-oss/react-multi-select-component/blob/master/README.md
import './Feed.scss'; 
import UsersPostDisplay from './UsersPostDisplay'
import {Tag} from './Tags';
import { AnyAaaaRecord } from 'dns';


export interface PostDataObject {
    image_s3_id: string; 
    post_id: string;
    text_body: string;
    user_id_fk: string  | null | undefined;
    tags: Tag[] ;
}
export interface UsersObject {
    user_id: string | null | undefined;
    postArray: PostDataObject[];
    setPostArray: React.Dispatch<React.SetStateAction<PostDataObject[]>>;
    index: number;
}
export interface Friend {
    user_id: string  | null | undefined;
    username: string;
}
export interface FeedProps {
    social_bool: boolean;
    user_id_in: string | null | undefined;
}
const Feed: React.FC<FeedProps> = ({social_bool, user_id_in}) => {
    const AuthState = useSelector((state: RootState) => state.auth);
    const [postArray, setPostArray] = useState<PostDataObject[]>([]);
    const [userLists, setUsersLists] = useState([])
    useEffect(() => {
        async function getFriends() {
            console.log(AuthState.token)
            console.log(AuthState.user_id)
            if(AuthState.token && social_bool) {
                try {
                    const response = await axios.get(`http://52.90.96.133:5500/api/users/${AuthState.user_id}/friends`, {
                        headers: { 
                            'Authorization': `Bearer ${AuthState.token}`,
                            'Content-Type': 'application/json'}
                    });
                    console.log(response);

                    setUsersLists(response.data.friendsList);

                } catch(err){
                    console.error(err)
                }
            }
        }
        getFriends();
    }, [AuthState.user_id,AuthState.token]);
    if(!social_bool){
        return (
            <div id="feed_container">
                <UsersPostDisplay user_id={user_id_in ? user_id_in : AuthState.user_id} postArray={postArray} setPostArray={setPostArray} index={0}/>
            </div>
        );
    }
    return (
        <div id="feed_container">
            {userLists.map((friend :Friend , index) => (
                <UsersPostDisplay key={index} user_id={friend.user_id} postArray={postArray} setPostArray={setPostArray} index={index}/>
            ))}
        </div>
    );
}
export default Feed;