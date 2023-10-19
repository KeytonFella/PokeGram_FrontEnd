import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';

const BASE_API = `http://52.90.96.133:5500/api/trades`;
const POKE_API = 'https://pokeapi.co/api/v2/pokemon/';

function SurrenderList() {
  const [surrenderList, setsurrenderList] = useState(Array<any>);
  const AuthState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    getSurrenderList();
  },[]);

  async function getSurrenderList() {
      axios.get(`${BASE_API}/data`, {headers: {Authorization: 'Bearer ' + AuthState.token}})
      .then(function (response) {
        createPokemonObj(response.data.trades.surrender_list);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  // Searches Poke API for each pokemon and creates an object with the name and sprite
  async function createPokemonObj(pokemon: any[]) {
      let pokemonArray = [];
      for(let i = 0; i < pokemon.length; i++) {
          let pokeId = pokemon[i];
          let pokeInfo = await axios.get(POKE_API + pokeId);
          let pokeObj = {
              id: pokeId,
              name: pokeInfo.data.species.name,
              image: pokeInfo.data.sprites.front_default
          }
          pokemonArray.push(pokeObj);
      }
      setsurrenderList(pokemonArray);
  }
  
  async function addPokemon(event: any) {
    event.preventDefault();

    // Read the form data
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const pokemon: String = formJson.myInput as String;
    

    await axios.put(`${BASE_API}/surrender-list`, {action: "add", pokemon: pokemon}, {headers: {Authorization: 'Bearer ' + AuthState.token}})
    .then(response => response.data.message)
    .catch(error => console.log(error));
    getSurrenderList();
  }

  async function removePokemon(event: any) {
    await axios.put(`${BASE_API}/surrender-list`, {action: "remove", pokemon: event.target.value}, {headers: {Authorization: 'Bearer ' + AuthState.token}})
    .then(response => response.data.message)
    .catch(error => console.log(error));
    getSurrenderList();
  }

  return (
    <>
    <div className="container">
        <div className="row">
          <div className="header text-center">Pokemon To Trade</div>
          <form method="post" onSubmit={addPokemon}>
            <label>
              Pokemon Search: <input name="myInput" defaultValue="" />
            </label>
            <button type="submit">Add Pokemon</button>
          </form>

        </div>
        <div className="row">
        {
          surrenderList.map((pokemon, index) => {
            return (
              <div className="col text-center"key={pokemon.id}>
              <div className="surrenderList" >
                <h6>{pokemon.name}</h6>
                <img src={pokemon.image} alt="" />
                <button className="button" onClick={removePokemon} value={pokemon.id} >Remove</button>
              </div>
              </div>
            )
          })
        }
        </div>
      </div>  
    </>
  )
}

export default SurrenderList