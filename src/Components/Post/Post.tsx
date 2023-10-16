import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes'; // Import your RootState type
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../utility/auth'; // Im+
import { AppDispatch } from '../../utility/store';//
import { MultiSelect } from "react-multi-select-component";

import './Post.scss';
//import { Event } from 'aws-sdk/clients/s3';
const tagoptions = [
  { label: "#trades", value: "trades" },
  { label: "#catches", value: "catches" },
  { label: "#general", value: "general"},
  { label: "#memes", value: "memes"},
  { label: "#image", value: "image"},
  { label: "#challenge", value: "challenge"},
  { label: "#commentary", value: "commentary"},
  { label: "#nsfw", value: "nsfw"},
];

function Post() {
  const AuthState = useSelector((state: RootState) => state.auth);
  const [textareaValue, setTextareaValue] = useState('');
  const dispatch: AppDispatch = useDispatch(); // Use AppDispatch for dispatching actions


  


  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };
  function on_hover_button(e : React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.style.background = '#034480';
  }
  function on_leave_button(e : React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.style.background = '#035096';
  }
  function on_click_submit(e: React.MouseEvent<HTMLButtonElement>){
    console.log(textareaValue);
    // const updatedInfo = {
    //   name: 'josh',
    //   user_id: 'something reasonable', // You can update other fields as well
    //   token: 'sha256--23',
    // };
    // dispatch(setUserInfo(updatedInfo));
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
     
      <button className="btn btn-info" id="upload_image">Upload Image</button>
      {/* <div id = "add_tags">
        <h1 id = "tag_header">Tags <img src= {require("../../images/tag.jpg")} alt ="" id="tag_img"/></h1>
        <MultiSelect
          options={tagoptions}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
        />
      </div> */}
      <button className="btn btn-info" id="add_tags">Tags <img src= {require("../../images/tag.jpg")} alt ="" id="tag_img"/></button>
      <button className="btn btn-info" id="post_button" onMouseOver={on_hover_button} onMouseLeave={on_leave_button} onClick={on_click_submit}>Post</button>
    </div>
);
}

export default Post;