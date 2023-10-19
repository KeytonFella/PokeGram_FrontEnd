import React, {useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import  axios from 'axios';
//credit https://github.com/hc-oss/react-multi-select-component/blob/master/README.md
import './IndivPost.scss'; 
interface ElementComponentProps {
    username: string;
    text_body: string;
    image_s3_id: string;
}
const IndivPost: React.FC<ElementComponentProps> = ({ username, text_body, image_s3_id }) => {
    const AuthState = useSelector((state: RootState) => state.auth);

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
    
    <div className="post-image">
        {imageData && <img src={imageData} alt=""/>}
    </div>

    return (
        <div className="ind_post_display">
            <div className="post-text-container">
                <p>${username} {text_body}</p>
            </div>
            <div className="post-img-container">
                {imageData && <img src={imageData} alt="Downloaded" className="post_img"/>}
            </div>
        </div>
    );
}
export default IndivPost