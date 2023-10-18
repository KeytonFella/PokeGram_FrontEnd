import React, {useState, useEffect, useRef } from 'react';
import  axios from 'axios';
//credit https://github.com/hc-oss/react-multi-select-component/blob/master/README.md
import './IndivPost.scss'; 
interface ElementComponentProps {
    text_body: string;
    user_id_fk: string;
    image_s3_id: string;
}
const IndivPost: React.FC<ElementComponentProps> = ({ text_body, user_id_fk, image_s3_id }) => {
    const [imageData, setImageData] = useState('');
    useEffect(() => {
        async function getImage(image_s3_id: string) {
            if(image_s3_id) {
                try {
                    const response = await axios.get('http://localhost:5500/api/post/image?image_id=7075f071-ac37-4503-96d4-5bea521eed11', {
                        responseType: 'blob'
                    });
                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const imageUrl = URL.createObjectURL(blob);
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
                <p>${user_id_fk} {text_body}</p>
            </div>
            <div className="post-img-container">
                {imageData && <img src={imageData} alt="Downloaded" className="post_img"/>}
            </div>
        </div>
    );
}
export default IndivPost