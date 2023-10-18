import React, { useState } from 'react'
import './Home.scss';
import Post from "../Post/Post";
import StuffModal from "../StuffModal/StuffModal"
import EditTeam from '../Edit Team/EditTeam';
import TeamView from '../TeamView/TeamView';

function Home() {
  
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
            <div className="box">Stuff Component
            <TeamView /></div>

          </div>
          <div className="col">
            <div className="box">{<Post/>}</div>
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