import React, {useState} from 'react';
import  axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../utility/auth';
import { AppDispatch } from '../../utility/store';
//credit https://github.com/hc-oss/react-multi-select-component/blob/master/README.md
import './Feed.scss'; 
import UsersPostDisplay from './UsersPostDisplay'
const friends_list = ["something reasonable", "1237283usd-1-sdf--sd-qw-das"];

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
    const [postArray, setPostArray] = useState<PostDataObject[]>([]);
    return (
        <div id="feed_container">
            <p>HIIIIII</p>
            {friends_list.map((friend, index) => (
                <UsersPostDisplay key={index} user_id={friend} postArray={postArray} setPostArray={setPostArray} index={index}/>
            ))}
        </div>
    );
}
export default Feed;