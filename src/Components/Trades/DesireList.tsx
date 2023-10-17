import axios from 'axios';
import React, { useEffect, useState } from 'react'

const USER_ID = "Jessie";
const BASE_API = `http://localhost:5500/api/trades/${USER_ID}`;
const POKE_API = 'https://pokeapi.co/api/v2/pokemon/';

function DesireList() {
  const [desireList, setdesireList] = useState(Array<any>);

  useEffect(() => {
    getDesireList();
  },[]);

  async function getDesireList() {
      axios.get(`${BASE_API}/data`)
      .then(function (response) {
        createPokemonObj(response.data.trades.desire_list);
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
      setdesireList(pokemonArray);
  }
  
  async function addPokemon(event: any) {
    event.preventDefault();

    // Read the form data
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const pokemon: String = formJson.myInput as String;
    
    await axios.put(`${BASE_API}/desire-list`, {action: "add", pokemon: pokemon})
    .then(response => response.data.message)
    .catch(error => console.log(error));
    getDesireList();
  }

  async function removePokemon(event: any) {
    await axios.put(`${BASE_API}/desire-list`, {action: "remove", pokemon: event.target.value})
    .then(response => response.data.message)
    .catch(error => console.log(error));
    getDesireList();
  }

  return (
    <>
    <div className="container">
        <div className="row">
          <div className="header text-center">Pokemon To Receive</div>
          <form method="post" onSubmit={addPokemon}>
            <label>
              Pokemon Search: <input name="myInput" defaultValue="" />
            </label>
            <button type="submit">Add Pokemon</button>
          </form>

        </div>
        <div className="row">
        {
          desireList.map((pokemon, index) => {
            return (
              <div className="col text-center"key={pokemon.id}>
              <div className="desireList" >
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

export default DesireList