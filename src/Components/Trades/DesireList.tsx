import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import './PokemonList.scss';

const BASE_API = `http://52.90.96.133:5500/api/trades`;
const POKE_API = 'https://pokeapi.co/api/v2/pokemon/';

function DesireList() {
  const [desireList, setdesireList] = useState(Array<any>);
  const AuthState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    getDesireList();
  },[]);

  async function getDesireList() {
      axios.get(`${BASE_API}/data`, {headers: {Authorization: 'Bearer ' + AuthState.token}})
      .then(function (response) {
        if (response.data && response.data.trades && response.data.trades.desire_list) {
          createPokemonObj(response.data.trades.desire_list);
        }      }) 
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  // Searches Poke API for each pokemon and creates an object with the name and sprite
  async function createPokemonObj(pokemon: any[]) {
    if (!Array.isArray(pokemon)) {
      return;
    }
      let pokemonArray = [];
      for(let i = 0; i < pokemon.length; i++) {
          let pokeId = pokemon[i];
          let pokeInfo = await axios.get(POKE_API + pokeId);
          if(!(pokeInfo.data && pokeInfo.data.species && pokeInfo.data.species.name && pokeInfo.data.sprites && pokeInfo.data.sprites.front_default)){
            return;
          }
          let pokeObj = {
              id: pokeId,
              name: pokeInfo.data.species.name.charAt(0).toUpperCase() + pokeInfo.data.species.name.slice(1),
              image: pokeInfo.data.sprites.front_default
          }
          pokemonArray.push(pokeObj);
      }
      pokemonArray.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
      setdesireList(pokemonArray);
  }
  
  async function addPokemon(event: any) {
    event.preventDefault();

    // Read the form data
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const pokemon: String = formJson.myInput as String;
    
    await axios.put(`${BASE_API}/desire-list`, {action: "add", pokemon: pokemon}, {headers: {Authorization: 'Bearer ' + AuthState.token}})

    .then(response => response.data.message)
    .catch(error => console.log(error));
    getDesireList();
  }

  async function removePokemon(event: any) {
    await axios.put(`${BASE_API}/desire-list`, {action: "remove", pokemon: event.target.value}, {headers: {Authorization: 'Bearer ' + AuthState.token}})
    .then(response => response.data.message)
    .catch(error => console.log(error));
    getDesireList();
  }

  return (
    <>
        <div className="pokemonListOuterContainer">
        <div className="row">
          <div className="tradeHeader text-center">Pokemon To Receive</div>
          <form className="pokemonSearch" method="post" onSubmit={addPokemon}>
            <div className="leftSearch">
              <label className="searchLabel">
                Name or Number:
              </label>
              <input className="searchInput" name="myInput" defaultValue="" />
              <button className="searchButton" type="submit">Add</button>
            </div>
            <div className="searchInstructions">Search for a Pokemon by name or using its National Pokedex number</div>
          </form>
        </div>
        <div className="pokemonList">
        {
          desireList.map((pokemon, index) => {
            return (
              <div className="pokemonCard" key={pokemon.id}>
                <img className="pokemonImage" src={pokemon.image} alt="" />
                <div className="pokemonId">#{("000" + pokemon.id).slice(-4)}</div>
                <div className="pokemonName"><h5>{pokemon.name}</h5></div>               
                <button className="removePokemonButton" onClick={removePokemon} value={pokemon.id} >Remove</button>
              </div>
            )
          })
        }
        </div>
      </div>  
    </>
  )
}

export default DesireList