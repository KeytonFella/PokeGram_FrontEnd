import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import { RootState } from './utility/reduxTypes'; // Import your RootState type
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Trades from './pages/Trades';
//import Post from "./Components/Post/Post";
import Profiles from './Components/Profiles/Profiles';
import Confirm from './Components/Confirm/Confirm';


function App() {
  return (
    <div className="App">   
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/trades" element={<Trades/>}/>
        <Route path="/profiles" element={<Profiles />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/confirm' element={<Confirm/>}/>
        
    </Routes>
    </div>    
  );
}
export default App;