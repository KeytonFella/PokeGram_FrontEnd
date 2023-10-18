import React, {useState, useEffect} from 'react'
import axios from 'axios'

import './ProfilePokemon.scss'


const ProfilePokemon = (props:any) => {

    const USER_ID = props.user_id;
    // id for testing purposes
    // const userID = '66efa9ce-6a6d-4466-a2ef-a48f00f82f40'
    const URL = `http://52.90.96.133:5500/api/profiles/${USER_ID}/pokemon`;
    const POKE_API = 'https://pokeapi.co/api/v2/pokemon/';
    let [pokemon, setPokemon] = useState([] as any);

    useEffect(() => {
        getPokemon();
    },[]);

    // Calls api for the list of pokemon and hands it to other helper function
    async function getPokemon() {
        axios.get(URL)
            .then(response => createPokemonObj(response.data.message))
            .catch(error => console.log(error));
    }

    // Searches Poke API for each pokemon and creates an object with the name and sprite
    async function createPokemonObj(pokemon: string[]) {
        let pokemonArray = [];
        for(let i = 0; i < pokemon.length; i++) {
            let pokeName = pokemon[i];
            let pokeSprite = await axios.get(POKE_API + pokeName.toString().toLowerCase());
            let pokeObj = {
                name: pokeName,
                sprite: pokeSprite.data.sprites.front_default
            }
            pokemonArray.push(pokeObj);
        }
        setPokemon(pokemonArray);
    }

    async function removePokemon(event: any) {
        await axios.put(`${URL}/remove`, {pokemon: event.target.value})
        .then(response => response.data.message)
        .catch(error => console.log(error));
        getPokemon();
    }

  return (
    <div>
        <h1 className="title">Pokemon</h1>
        <div id="container" className="container">
            {pokemon.map((poke: any) => (
            <div key={poke.name} className="entry">
                <p className="names">{poke.name}</p>
                <img src={poke.sprite} alt={poke.name} className="sprite"/>
                <button className="btn" onClick={removePokemon} value={poke.name} >Remove</button>
            </div>
            ))}    
        </div>
    </div>
  )
}

export default ProfilePokemon