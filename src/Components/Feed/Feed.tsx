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


export interface PostDataObject {
    image_s3_id: string;
    post_id: string;
    text_body: string;
    user_id_fk: string;
}
export interface UsersObject {
    user_id: string;
    postArray: PostDataObject[];
    setPostArray: React.Dispatch<React.SetStateAction<PostDataObject[]>>;
    index: number;
}

export interface Friend {
    user_id: string;
    username: string;
}
function Feed() {
    const AuthState = useSelector((state: RootState) => state.auth);
    const [postArray, setPostArray] = useState<PostDataObject[]>([]);
    const [friends, setFriends] = useState([])
    useEffect(() => {
        async function getFriends() {
            console.log(AuthState.token)
            console.log(AuthState.user_id)

            if(AuthState.token) {
                try {
                    const response = await axios.get(`http://52.90.96.133:5500/api/users/${AuthState.user_id}/friends`, {
                        headers: { 
                            'Authorization': `Bearer ${AuthState.token}`,
                            'Content-Type': 'application/json'}
                    });
                    console.log(response);

                    setFriends(response.data.friendsList);

                } catch(err){
                    console.error(err)
                }
            }
        }
        getFriends();
    }, [AuthState.user_id,AuthState.token]);
    return (
        <div id="feed_container">
            {friends.map((friend :Friend , index) => (
                <UsersPostDisplay key={index} user_id={friend.user_id} postArray={postArray} setPostArray={setPostArray} index={index}/>
            ))}
        </div>
    );
}
export default Feed;