import React from 'react';

import TeamView from './components/TeamView/TeamView';

import Post from "./components/Post/Post";
import { useSelector } from 'react-redux';
import { RootState } from './utility/reduxTypes'; // Import your RootState type
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import CreateTeam from './components/CreateTeam/CreateTeam';



function App() {
  const authState = useSelector((state: RootState) => state.auth);
  const token = authState.token;
  const name = authState.name;
  const user_id = authState.user_id;
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
      
          <Route path="/" element={<Home />}/>
          <Route path="/posts" element={<Post/>}/>
          <Route path="/team" element={<TeamView/>}/>
          <Route path="/createTeam" element={<CreateTeam/>}/>
      
      </Routes>
    </div>
    
  );
}

export default App;