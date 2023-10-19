import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SurrenderList from './SurrenderList';
import DesireList from './DesireList';
import AvailableTrades from './AvailableTrades';

function Trades() {

  return (
    <>
      <div className="container">
        <div className="row">
          {<SurrenderList/>}
        </div>
        <div className="row">
          {<DesireList/>}
        </div>
        <div className="row">
          {<AvailableTrades/>}
        </div>
      </div>
    </>
  )
}

export default Trades