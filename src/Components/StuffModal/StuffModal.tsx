import React from 'react'
import './StuffModal.scss';

function StuffModal() {
  return (
    <>
      <div className="col">
        <button type="button" className="stuffModal btn-primary" data-bs-toggle="modal" data-bs-target="#stuffModal">
            Stuff
        </button>
        <div className="modal fade" id="stuffModal"  aria-labelledby="stuffModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h1 className="modal-title fs-5" id="stuffModalLabel">Stuff</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                Stuff Component
                </div>
            </div>
            </div>
        </div>
      </div>
      <div className="col">
        <button type="button" className="otherStuffModal btn-primary" data-bs-toggle="modal" data-bs-target="#otherStuffModal">
            Other Stuff
        </button>
        <div className="modal fade" id="otherStuffModal"  aria-labelledby="otherStuffModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h1 className="modal-title fs-5" id="otherStuffModalLabel">Other Stuff</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                Other Stuff component
                </div>
            </div>
            </div>
        </div>
      </div>
  </>
  )
}

export default StuffModal