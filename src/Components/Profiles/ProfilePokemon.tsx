import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';

import './ProfilePokemon.scss'


const ProfilePokemon = (props:any) => {
    const AuthState = useSelector((state: RootState) => state.auth);
    const USER_ID = props.user_id;

    const URL = `https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/profiles/${USER_ID}/pokemon`;
    const POKE_API = 'https://pokeapi.co/api/v2/pokemon/';
    let [pokemon, setPokemon] = useState([] as any);

    useEffect(() => {
      console.log(AuthState.user_id)
        getPokemon();
    },[]);

    // Calls api for the list of pokemon and hands it to other helper function
    async function getPokemon() {
        axios.get(URL, {headers: {Authorization: AuthState.token}})
            .then(response => createPokemonObj(response.data.message))
            .catch(error => console.log(error));
    }

    // Searches Poke API for each pokemon and creates an object with the name and sprite
    async function createPokemonObj(pokemon: string[]) {
        let pokemonArray = [];
        for(let i = 0; i < pokemon.length; i++) {
            let pokeName = pokemon[i][0].toUpperCase() + pokemon[i].slice(1);
            console.log(pokeName)
            let pokeSprite = await axios.get(POKE_API + pokeName.toString().toLowerCase());
            let pokeObj = {
                name: pokeName,
                sprite: pokeSprite.data.sprites.front_default
            }
            pokemonArray.push(pokeObj);
        }
        setPokemon(pokemonArray);
    }

    async function addPokemon(event: any) {
        event.preventDefault();
    
        // Read the form data
        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        let pokemon: String = formJson.myInput as String;
        pokemon = pokemon.toLowerCase();
        await axios.put(URL, {action: "add", pokemon: pokemon}, {headers: {Authorization: AuthState.token}})
        .then(response => response.data.message)
        .catch(error => console.log(error));
        getPokemon();
      }

    async function removePokemon(event: any) {
        event.preventDefault();
        let pokemon = event.target.value;
        pokemon = pokemon.toLowerCase();
        await axios.put(URL, {action: "remove", pokemon: pokemon}, {headers: {Authorization: AuthState.token}})
        .then(response => response.data.message)
        .catch(error => console.log(error));
        getPokemon();
    }

  return (
    <div>
        <h1 className="title">Pokemon</h1>
        <div className="row">
          <form method="post" onSubmit={addPokemon}>
            <label>
              Pokemon Search: <input name="myInput" defaultValue="" />
            </label>
            <button type="submit">Add Pokemon</button>
          </form>
        </div>
        <div className="pokemonList">
            {pokemon.map((poke: any) => (
            <div key={poke.name} className="pokemonCard">
                <img src={poke.sprite} alt={poke.name} className="pokemonImage"/>
                <div className="pokemonName"><h5>{poke.name}</h5></div>
                <button className="remove-btn" onClick={removePokemon} value={poke.name} >Release</button>
            </div>
            ))}    
        </div>
    </div>
  )
}

export default ProfilePokemon
