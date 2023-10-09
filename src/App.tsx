import React from 'react';

import TeamView from './components/TeamView/TeamView';


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

      Hello World!
      Updated from VSCode to GitHub to AWS
      

      <h1>User Details</h1>
      <p>User ID: {user_id}</p>
      <p>Name: {name}</p>
      <p>Token: {token}</p>
      <TeamView />
    </div>
  );
}

export default App;
