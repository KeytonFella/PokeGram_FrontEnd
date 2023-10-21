import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SurrenderList from './SurrenderList';
import DesireList from './DesireList';
import AvailableTrades from './AvailableTrades';

function Trades() {

  return (
    <>
      <div className="container">
        <div className="container">
          {<SurrenderList/>}
        </div>
        <div className="container">
          {<DesireList/>}
        </div>
        <div className="container">
          {<AvailableTrades/>}
        </div>
      </div>
    </>
  )
}

export default Trades