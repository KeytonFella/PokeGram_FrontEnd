import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import './PokemonList.scss';



function DesireList() {
  const [desireList, setdesireList] = useState(Array<any>);
  const AuthState = useSelector((state: RootState) => state.auth);
  const USER_ID = AuthState.user_id;
  const BASE_API = `https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/trades/${USER_ID}`;
  const POKE_API = 'https://pokeapi.co/api/v2/pokemon/';

  useEffect(() => {
    getDesireList();
  },[]);

  async function getDesireList() {
      axios.get(`${BASE_API}/data`, {headers: {Authorization: AuthState.token}})
      .then(function (response) {
        const userData = response.data.body.Item;
        if (userData && userData.desire_list) {
          createPokemonObj(userData.desire_list);
        }      
      }) 
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
    
    await axios.put(`${BASE_API}/desire-list`, {action: "add", pokemon: pokemon}, {headers: {Authorization: AuthState.token}})

    .then(response => response.data.message)
    .catch(error => console.log(error));
    getDesireList();
  }

  async function removePokemon(event: any) {
    await axios.put(`${BASE_API}/desire-list`, {action: "remove", pokemon: event.target.value}, {headers: {Authorization: AuthState.token}})
    .then(response => response.data.message)
    .catch(error => console.log(error));
    getDesireList();
  }

  return (
    <>
        <div className="pokemonListOuterContainer">
        <div className="row">
          <div className="tradeHeader text-center">Pokemon To Receive</div>
          <button className="btn btn-secondary" data-bs-toggle="collapse" data-bs-target="#pokemonListContainerDesire">Collapse</button>
          <div className="containerList collapse show" id='pokemonListContainerDesire'>
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
        </div>
      </div>  
    </>
  )
}

export default DesireList