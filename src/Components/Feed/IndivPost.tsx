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
    const [imageData, setImageData] = useState('');
    useEffect(() => {
        async function getImage(image_s3_id: string) {
            if(image_s3_id) {
                try {
                    const response = await axios.get(`http://52.90.96.133:5500/api/post/image?image_id=${image_s3_id}`, {
                        headers: {
                            Authorization: `Bearer ${AuthState.token}`,
                        }
                    });
                const imageUrl = response.data.image_url;
                setImageData(imageUrl);
                } catch (error) {
                    console.error('Error downloading image:', error);
                }
            }
        };
        getImage(image_s3_id);
    }, []);
    
    return (
        <div className="ind_post_display">
            <div className="profile-link-container">
                <div id="user-profile-image-containter">
                    <img src={profilePicUrl} className='profile_pic'/>
                </div>
                <div id="user-profile-name-containter">
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
                {imageData && <img src={imageData} alt="Downloaded" className="post_img"/>}
            </div>
            {<Tags tags = {tags}/>}
        </div>
    );
}
export default IndivPost