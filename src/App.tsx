import React from 'react';
import Post from "./Components/Post/Post";
import { useSelector } from 'react-redux';
import { RootState } from './utility/reduxTypes'; // Import your RootState type
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home';

import Profiles from './Components/Profiles/Profiles';

function App() {
  const authState = useSelector((state: RootState) => state.auth);
  const token = authState.token;
  const name = authState.name;
  const user_id = authState.user_id;
  
  return (
    <Routes>
      <div className="App">
        <Navbar />
          <Route path="/" element={<Home />}/>
          <Route path="/profiles" element={<Profiles />}/>
          <Route path="/posts" element={<Post/>}/>
      </div>
    </Routes>
    
  );
}

export default App;