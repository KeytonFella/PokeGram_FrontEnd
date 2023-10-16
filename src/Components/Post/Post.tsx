import React, {useState, useRef } from 'react';
import  axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../utility/auth';
import { AppDispatch } from '../../utility/store';
//credit https://github.com/hc-oss/react-multi-select-component/blob/master/README.md
import { MultiSelect } from "react-multi-select-component";
import './Post.scss';
const tagoptions = [
  { label: "#trades", value: "trades" },
  { label: "#catches", value: "catches" },
  { label: "#general", value: "general"},
  { label: "#memes", value: "memes"},
  { label: "#image", value: "image"},
  { label: "#challenge", value: "challenge"},
  { label: "#commentary", value: "commentary"},
  { label: "#great", value: "great"},
];
interface PostProps {
  isOpen: boolean;
  closeModal: () => void;
}
const Post: React.FC<PostProps> = ({ isOpen, closeModal }) => {
  const AuthState = useSelector((state: RootState) => state.auth);
  const [textareaValue, setTextareaValue] = useState('');
  const [selected, setSelected] = useState([]);
  const [imageData, setImageData] = useState<string | null>(null);

  const fileInputRef =  useRef<HTMLInputElement | null>(null);
  const dispatch: AppDispatch = useDispatch(); 
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };
  const on_click_image = (e: React.MouseEvent<HTMLButtonElement>) =>{
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  const on_hover_button = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = '#034480';
  }
  const on_leave_button = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = '#035096';
  }
  async function postImage(){
    if(fileInputRef.current && fileInputRef.current.files) {
      try {
          let imageFile = fileInputRef.current.files[0];
          if(imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);
            const response = await axios.post('http://localhost:5500/api/post/image', formData, {
              headers: {'Content-Type': 'multipart/form-data'}
            })
            console.log('Image uploaded successfully:', response.data);
            return response.data.image_id
          } else {
            return null;
          }
      } catch(err) {
        console.error('Image upload failed:', err);
      }
    } else {
      return null;
    }
  }
  async function on_click_submit(e: React.MouseEvent<HTMLButtonElement>){
    const updatedInfo = {
      name: 'Josh',
      user_id: 'something reasonable', 
      token: 'sha256--23',
    };
    dispatch(setUserInfo(updatedInfo));
    const image_id = await postImage();
    fileInputRef.current = null;
    if(textareaValue) {
      const data = {
        current_userID: AuthState.user_id,
        text_body: textareaValue,
        image_s3_id: image_id,
        tags: selected
      };
      axios.post('http://localhost:5500/api/post', data, {
        headers: {'Content-Type':'application/json'}
      })
      .then((response) => {
        console.log('Post Successfully Uploaded\n post_id: ', response.data.post_id);
        closeModal();
      })
      .catch((error) => {
        console.error('Post Failed to Upload', error);
      });
    }
  }
//credit https://css-tricks.com/auto-growing-inputs-textareas/ Chris Coyier on Mar 25, 2020
function calcHeight(value: string) {
  let numberOfLineBreaks = (value.match(/\n/g) || []).length;
  let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
  return newHeight;
}
function on_keyup_textarea(e : React.KeyboardEvent<HTMLTextAreaElement>) {
  e.currentTarget.style.height = calcHeight(e.currentTarget.value) + "px";
}
const handleDownload = async () => {
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
};


return (
  <div className={`modal ${isOpen ? 'open' : ''}`}>
    <div id = "post_container">
      <span className="close" onClick={closeModal}>
        &times;
      </span>
      <h2>Make a Post</h2>
      <span>{AuthState.name} </span>
      <span>is feeling okay</span>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{display: 'none'}}
      />
      <br/>
=======
  return (
      <div id = "post_container">
        <span>{AuthState.name} </span>
        {<span>{AuthState.username} </span>}<br/>
        <span>is feeling okay</span>
        {/* Use the token as needed in this child component */}
        <br/>
        <textarea placeholder="What's on your mind" id="post_body" onKeyUp={on_keyup_textarea} value={textareaValue}
        onChange={handleTextareaChange}></textarea>
      <br/>
      <div id = "add_tags">
        <h1 id = "tag_header">Tags <img src= {require("../../images/tag.jpg")} alt ="" id="tag_img"/></h1>
        <MultiSelect options={tagoptions} value={selected} onChange={setSelected} labelledBy="Select"/>
      </div>
      <button className="btn btn-info" id="upload_image" onMouseOver={on_hover_button} onMouseLeave={on_leave_button} onClick={on_click_image}>Upload Image</button>
      <button className="btn btn-info" id="post_button" onMouseOver={on_hover_button} onMouseLeave={on_leave_button} onClick={on_click_submit}>Post</button>
      <button onClick={handleDownload}>Download Image</button>
      {imageData && <img src={imageData} alt="Downloaded" />}
      </div>
    </div>
);
}
export default Post;