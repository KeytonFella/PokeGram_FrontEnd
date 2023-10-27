import React, {useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import { Link } from 'react-router-dom';
import Tags, {Tag} from './Tags';
import  axios from 'axios';
//credit https://github.com/hc-oss/react-multi-select-component/blob/master/README.md
import './IndivPost.scss'; 
interface IndivPostProps {
    username: string;
    useridfk: string | null | undefined;
    post_id: string  | null | undefined;
    profilePicUrl: string;
    text_body: string;
    image_s3_id: string;
    tags:  Tag[];
    social_bool: boolean;
}


const IndivPost: React.FC<IndivPostProps> = ({ username, profilePicUrl, post_id, useridfk, text_body, image_s3_id, tags, social_bool }) => {
    const AuthState = useSelector((state: RootState) => state.auth);
    const [deleted, setDeleted] = useState(false)
    const linkStyle = {
        "fontWeight": "bold",
        "color": 'black'
      };
    async function deletePost(e: React.MouseEvent<HTMLButtonElement>){
        const postDeleteResponse = await axios.delete(`https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/posts/${useridfk}/${post_id}`, 
            {headers: {
                'Authorization': AuthState.token,
                'Content-Type': 'application/json'
        }})
        console.log("delete posts:", postDeleteResponse);
        setDeleted(true);
    };
    console.log(social_bool, useridfk, AuthState.user_id)
    return (
        <>
        { (!deleted) &&
        <div className="ind_post_display">
            <div className="top-bar-container">
                <div className="profile-link-container">
                    <div id="indiv-profile-image-containter">
                        {profilePicUrl && <img src={profilePicUrl} className='profile_pic'/>}
                    </div>
                    <div id="indiv-profile-name-containter">
                        <Link style={linkStyle} to={`/profile/${useridfk}`}>{username}</Link>
                        <span>  @ {useridfk}</span>
                    </div>
                </div>
                {(!social_bool && useridfk == AuthState.user_id ) &&
                    <div id="deleteContainer">
                        <button className="btn btn-info" id="delete-button" onClick={deletePost}>Delete 🗑️</button>
                </div>}
            </div>
            
            <div className='post-text-container'>
                <div className='text-body'>
                    {text_body}
                </div>
            </div>
            <div className="post-img-container">
                {image_s3_id && <img src={image_s3_id} alt="Downloaded" className="post_img"/>}
            </div>
            {<Tags tags = {tags}/>}
        </div>
        }
        </>
        
    );
}
export default IndivPost