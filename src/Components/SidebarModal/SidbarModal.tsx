import React from 'react'
import './SidebarModal.scss';
import TeamView from '../TeamView/TeamView';
import FriendFinder from '../FriendFinder/FriendFinder';

function SidebarModal() {
  return (
    <>
      <div className="col">
        <button type="button" className="stuffModal btn-primary" data-bs-toggle="modal" data-bs-target="#stuffModal">
            Team
        </button>
        <div className="modal fade" id="stuffModal"  aria-labelledby="stuffModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h1 className="modal-title fs-5" id="stuffModalLabel">Team</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                
                <TeamView />
                </div>
                
            </div>
            </div>
        </div>
      </div>
      <div className="col">
        <button type="button" className="otherStuffModal btn-primary" data-bs-toggle="modal" data-bs-target="#otherStuffModal">
            Friend Finder
        </button>
        <div className="modal fade" id="otherStuffModal"  aria-labelledby="otherStuffModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h1 className="modal-title fs-5" id="otherStuffModalLabel">Friend Finder</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <FriendFinder />
                </div>
            </div>
            </div>
        </div>
      </div>
  </>
  )
}

export default SidebarModal