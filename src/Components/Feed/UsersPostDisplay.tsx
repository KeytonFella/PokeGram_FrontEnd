import React, { useState, useEffect, useRef } from 'react';
import  axios from 'axios';
//credit https://github.com/hc-oss/react-multi-select-component/blob/master/README.md
import './UsersPostDisplay.scss'; 
import IndivPost from './IndivPost'
import {PostDataObject, ElementComponentProps} from './Feed'

const UsersPostDisplay: React.FC<ElementComponentProps> = ({user_id}) => {
    const [arr, setArr] = useState<PostDataObject[]>([])
    useEffect(() => {
        async function getUsersPosts(user_id: string) {
            if(user_id) {
                try {
                    const response = await axios.get(`http://localhost:5500/api/post/user?user_id=${user_id}`, {
                        headers: {'Content-Type': 'application/json'}
                    })
                    setArr((prevData)  => [...prevData, ...response.data.data]);
                } catch(err) {
                    console.error("Can't get post Text:", err);
                }
            }
        }
        getUsersPosts(user_id);
    }, []);

    return (
        <div className='user_post_display'>
            {arr.map( (item: PostDataObject, index: number) => (
                <IndivPost key={index} text_body={item.text_body} user_id_fk={item.user_id_fk} image_s3_id={item.image_s3_id}/>
            ))}
        </div>
    );
}
export default UsersPostDisplay;