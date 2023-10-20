import React, { useState } from 'react'
import './Home.scss';
import Post from "../Post/Post";
import EditTeam from '../EditTeam/EditTeam';
import TeamView from '../TeamView/TeamView';
import Feed from "../Feed/Feed";
import FriendFinder from '../FriendFinder/FriendFinder';
import SidebarModal from '../SidebarModal/SidbarModal';


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
        <div className="row top">
          <div className="headSection col_left">
            <div className="header text-center">Team</div>
          </div>
          <div className="headSection col_center">
            <div className="header text-center">Social Feed</div>
          </div>
          <div className="headSection col_right">
            <div className="header text-center">Users Nearby</div>
          </div>
        </div>
        <div className="row">
          <div className="sub_cont sub_cont1">
            <TeamView />
          </div>
          <div className="sub_cont sub_contSF">
            <div id="top_of_social_feed">
              <button className="btn btn-default" onClick={openModal} id="modal_open">
                <span id="add-post-text"> Add Post                    </span>
                <img src={require("../../images/posticon.png")} alt ="asd" width="50px"/> 
              </button>
              <Post isOpen={isModalOpen} closeModal={closeModal}/> 
            </div>
            <div className="socialFeedContainer">
              <Feed/>
            </div>
          </div>
          <div className = "sub_cont sub_cont2">
            <FriendFinder />
          </div>
        </div>
      </div>
      <div className="row d-xl-none">
        {<SidebarModal/>}
      </div>
    </>
  )
}

export default Home