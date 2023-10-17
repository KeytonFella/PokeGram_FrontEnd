import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SurrenderList from './SurrenderList';
import DesireList from './DesireList';
import AvailableTrades from './AvailableTrades';

const USER_ID = "James";
const BASE_API = `http://localhost:5500/api/trades/${USER_ID}`;
const POKE_API = 'https://pokeapi.co/api/v2/pokemon/';

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