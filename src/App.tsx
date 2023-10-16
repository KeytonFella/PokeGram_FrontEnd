import React, {useState} from 'react';
import Post from "./Components/Post/Post";
import { useSelector } from 'react-redux';
import { RootState } from './utility/reduxTypes'; // Import your RootState type
import './App.scss';
function App() {
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
  );
}
export default App;