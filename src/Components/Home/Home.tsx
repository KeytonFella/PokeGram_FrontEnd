import React, { useState } from 'react'
import './Home.scss';
import Post from "../Post/Post";
import EditTeam from '../EditTeam/EditTeam';
import TeamView from '../TeamView/TeamView';
import Feed from "../Feed/Feed";
import FriendFinder from '../FriendFinder/FriendFinder';
import SidebarModal from '../SidebarModal/SidebarModal';


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
      <div className="homeContainer">

        <div className="col d-none d-xl-block">
          <div className="sideContainerRed">
            <div className="header text-center">Team</div>
              <div className="sideContent">
              <TeamView />
              </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-10 col-11">
          <div className="mainContainer">
            <div className="header text-center">Social Feed</div>
            <div className="mainContent">
            <div id="top_of_social_feed">
              <button className="btn btn-default" onClick={openModal} id="modal_open">
                <span className="addPostText" id="add-post-text"> Add Post </span>
                <img src={require("../../images/posticon.png")} alt ="asd" width="50px"/> 
              </button>
              <Post isOpen={isModalOpen} closeModal={closeModal}/> 
            </div>
            <div className="socialFeedContainer">
              <Feed social_bool={true} user_id_in={null}/>
            </div>
            </div>
          </div>
        </div>

        <div className="col d-none d-xl-block">
          <div className="sideContainerGreen">
            <div className="header text-center">Users Nearby</div>
              <div className="sideContent">
              <FriendFinder />
              </div>
            </div>
          </div>
        <div className="row">
          
        </div>
      </div>
      <div className="row d-xl-none">
        {<SidebarModal/>}
      </div>
    </>
  )
}

export default Home