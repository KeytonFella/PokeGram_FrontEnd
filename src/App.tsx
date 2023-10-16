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
import Post from "./Components/Post/Post";
import Profiles from './Components/Profiles/Profiles';
import Confirm from './Components/Confirm/Confirm';


function App() {
/*   //values from the global redux store
  const authState = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = authState.token;
  const name = authState.name;
  const user_id = authState.user_id;
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  

  return (
    <div className="App">
      
      <h1>User Details</h1>
      <p>User ID: {user_id}</p>
      <p>Name: {name}</p>
      <p>Token: {token}</p>
      <button className="btn btn-default" onClick={openModal} id="modal_open">
        <img src={require("./images/posticon.png")} alt ="asd" width="50px"/> 
      </button>

      <Post isOpen={isModalOpen} closeModal={closeModal}/>
      <button className="btn btn-default" onClick={openModal} id="modal_open">
        
      </button>
    </div>

  const username = authState.username;
  const user_id = authState.user_id; */
  return (
    <div className="App">   
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/trades" element={<Trades/>}/>
        <Route path="/profiles" element={<Profiles />}/>
        <Route path="/posts" element={<Post/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/confirm' element={<Confirm/>}/>
        
    </Routes>
    </div>    
  );
}
export default App;