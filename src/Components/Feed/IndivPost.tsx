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
    profilePicUrl: string;
    text_body: string;
    image_s3_id: string;
    tags:  Tag[];
}


const IndivPost: React.FC<IndivPostProps> = ({ username, profilePicUrl, useridfk, text_body, image_s3_id, tags }) => {
    const AuthState = useSelector((state: RootState) => state.auth);
    const linkStyle = {
        "fontWeight": "bold",
        "color": 'black'
      };
    return (
        <div className="ind_post_display">
            <div className="profile-link-container">
                <div id="indiv-profile-image-containter">
                    {profilePicUrl && <img src={profilePicUrl} className='profile_pic'/>}
                </div>
                <div id="indiv-profile-name-containter">
                    <Link style={linkStyle} to={`/profile/${useridfk}`}>{username}</Link>
                    <span>  @ {useridfk}</span>
                </div>
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
    );
}
export default IndivPost