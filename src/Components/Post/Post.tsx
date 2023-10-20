import React, {useState, useRef } from 'react';
import  axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
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
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);


  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

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
          console.log("The image file is:", imageFile);
          if(imageFile) {
            console.log(imageFile)
            const formData = new FormData();
            formData.append('image', imageFile);
            console.log(formData)
            const response = await axios.post('http://52.90.96.133:5500/api/post/image/', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                "Content-Disposition" : "form-data",
                'Authorization': `Bearer ${AuthState.token}`
              },   
            });
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
    const image_id = await postImage();
    if(textareaValue) {
      const url = 'http://52.90.96.133:5500/api/post';
      const headers = {
        Authorization: `Bearer ${AuthState.token}`,
        'Content-Type':'application/json'
      };
      const body = {
        current_userID: AuthState.user_id,
        text_body: textareaValue,
        image_s3_id: image_id,
        tags: selected
      };
      axios.post(url, body, {headers })
      .then((response) => {
        console.log('Post Successfully Uploaded\n post_id: ', response.data.post_id);
        setTextareaValue('');
        setSelected([]);
        setImageData(null);
        setSelectedFileName(null);
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
const on_click_image = () =>{
if (fileInputRef.current) {
      fileInputRef.current.click();
    }
}
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    // Handle the selected file here
    const selectedFile = e.target.files[0];
    setSelectedFileName(selectedFile.name);
  } else {
    setSelectedFileName(null);
  }
};
return (
  <div className={`modal ${isOpen ? 'open' : ''}`}>
    <div id = "post_container">
      <span className="close" onClick={closeModal}>
        &times;
      </span>
      <h2>Make a Post</h2>    
      <br/>
        <span>{AuthState.name} </span>
        {<span>{AuthState.username} </span>}<br/>
        <br/>
        <textarea placeholder="What's on your mind" id="post_body" onKeyUp={on_keyup_textarea} value={textareaValue}
        onChange={handleTextareaChange}></textarea>
      <br/>
      <div id = "add_tags">
        <h1 id = "tag_header">Tags <img src= {require("../../images/tag.jpg")} alt ="" id="tag_img"/></h1>
        <MultiSelect options={tagoptions} value={selected} onChange={setSelected} labelledBy="Select"/>
      </div>
        <button className="btn btn-info" id="upload_image" onMouseOver={on_hover_button} onMouseLeave={on_leave_button} onClick={on_click_image}>Upload Image</button>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        {selectedFileName  && (
        <div>
          Selected File: {selectedFileName }
        </div>
      )}
      <button className="btn btn-info" id="post_button" onMouseOver={on_hover_button} onMouseLeave={on_leave_button} onClick={on_click_submit}>Post</button>
    </div>
  </div>
);
}
export default Post;