import React, {useState, useEffect} from 'react'
import axios from 'axios'

const API = 'http://localhost:5500/api/profiles/1/pokemon';
const POKE_API = 'https://pokeapi.co/api/v2/pokemon/';

const ProfilePokemon = () => {
    let [pokemon, setPokemon] = useState([] as any);

    useEffect(() => {
        getPokemon();
    },[]);

    async function getPokemon() {
        axios.get(API)
            .then(response => createPokemonObj(response.data.message))
            .catch(error => console.log(error));
    }

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

  return (
    <div>
        <ul>
            {pokemon.map((poke: any) => (
                <li key={poke.name}>
                    <img src={poke.sprite} alt={poke.name}/>
                    {poke.name}
                </li>
            ))}
        </ul>
    
    </div>
  )
}

export default ProfilePokemon


/**
 * pull list of pokemon
 * for each pokemon get the name and make an object w the name and sprite
 * add object to array
 * iterate through array and display each pokemon
 */