import React, { useState } from 'react'
import './Home.scss';
import Post from "../Post/Post";
import StuffModal from "../StuffModal/StuffModal"
import EditTeam from '../EditTeam/EditTeam';
import TeamView from '../TeamView/TeamView';
import Feed from "../Feed/Feed";


function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };    
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 d-none d-xl-block sm-col-1">
            <div className="header text-center">Team</div>
            
          </div>
          <div className="col">
            <div className="header text-center">Social Feed</div>
          </div>
          <div className="col-3 d-none d-xl-block">
            <div className="header text-center">Other Stuff</div>
          </div>
        </div>
        <div className="row">
          <div className="col-3 d-none d-xl-block">
            <div className="box">
            <TeamView />
            </div>

          </div>
          <div className="col" id = "social_feed_container">
            <div id="top_of_social_feed">
              <button className="btn btn-default" onClick={openModal} id="modal_open">
                <img src={require("../../images/posticon.png")} alt ="asd" width="50px"/> 
              </button>
              <Post isOpen={isModalOpen} closeModal={closeModal}/> 
            </div>
            <div id="posts_social_feed">
              <Feed/>
            </div>
          </div>
          <div className="col-3 d-none d-xl-block">
            <div className="box">Other Stuff Component</div>
          </div>
        </div>
      </div>
      <div className="row d-xl-none">
        {<StuffModal/>}
      </div>
    </>
  )
}

export default Home