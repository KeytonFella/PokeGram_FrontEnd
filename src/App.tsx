import React from 'react';
//import Post from "./Components/Post/Post";
import { useSelector } from 'react-redux';
import {RootState} from './utility/reduxTypes'; // Import your RootState type
function App() {
  const authState = useSelector((state: RootState) => state.auth);
  const token = authState.token;
  const name = authState.name;
  const user_id = authState.user_id;
  // <Post token={token} user_id={user_id}/>
  return (
    <div className="App">
      <h1>User Details</h1>
      <p>User ID: {user_id}</p>
      <p>Name: {name}</p>
      <p>Token: {token}</p>
      <p>asdf</p>
    </div>
  );
}

export default App;
