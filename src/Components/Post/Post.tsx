import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes'; // Import your RootState type
import './Post.scss';
//import { Event } from 'aws-sdk/clients/s3';
function Post() {
  const AuthState = useSelector((state: RootState) => state.auth);
  function on_hover_button(e : React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.style.background = '#034480';
  }
  function on_leave_button(e : React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.style.background = '#035096';
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
        <span>is feeling okay</span>
        {/* Use the token as needed in this child component */}
        <br/>
        <textarea placeholder="What's on your mind" id="post_body" onKeyUp={on_keyup_textarea}></textarea>
        <br/>
        <button className="btn btn-info" id="upload_image">Upload Image</button>
        <button className="btn btn-info" id="add_tags">Tags <img src="(../../../public/images/tag.png"/></button>

        <button className="btn btn-info" id="post_button" onMouseOver={on_hover_button} onMouseLeave={on_leave_button}>Post</button>
      </div>
  );
}

export default Post;