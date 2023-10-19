import React, {useState} from 'react';
import  axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
//import { useDispatch } from 'react-redux';
//import { setUserInfo } from '../../utility/auth';
import { AppDispatch } from '../../utility/store';
//credit https://github.com/hc-oss/react-multi-select-component/blob/master/README.md
import './Feed.scss'; 
import UsersPostDisplay from './UsersPostDisplay'


export interface PostDataObject {
    image_s3_id: string;
    post_id: string;
    text_body: string;
    user_id_fk: string;
}
export interface ElementComponentProps {
    user_id: string;
    postArray: PostDataObject[];
    setPostArray: React.Dispatch<React.SetStateAction<PostDataObject[]>>;
    index: number;
}


function Feed() {
    const AuthState = useSelector((state: RootState) => state.auth);
    const friends_list = [String(AuthState.user_id)];

    const [postArray, setPostArray] = useState<PostDataObject[]>([]);
    return (
        <div id="feed_container">
            <p>{AuthState.user_id}</p>
            {friends_list.map((friend, index) => (
                <UsersPostDisplay key={index} user_id={friend} postArray={postArray} setPostArray={setPostArray} index={index}/>
            ))}
        </div>
    );
}
export default Feed;