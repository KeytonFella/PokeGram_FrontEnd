import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './utility/reduxTypes'; // Import your RootState type
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home';
import Post from "./Components/Post/Post";
import Profiles from './Components/Profiles/Profiles';

function App() {
  const authState = useSelector((state: RootState) => state.auth);
  const token = authState.token;
  const name = authState.name;
  const user_id = authState.user_id;
  
  return (
    <div className='App'>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/profiles" element={<Profiles />}/>
          <Route path="/posts" element={<Post/>}/>
      </Routes>
    </div>
    
  );
}

export default App;