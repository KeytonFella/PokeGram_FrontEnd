import React, {useEffect, useState} from 'react'
import './PokemonInTeam.scss'
import { Pokemon } from '../../utility/PokemonType'

function PokemonInTeam(props: {pokemon: Pokemon}) {
    //let loading = true
    let [pokemon, setPokemon] = useState({} as any)
    let [loading, setLoading] = useState(true)
    
    const pokeUrl = "https://pokeapi.co/api/v2/pokemon/"
    let lower = props.pokemon.pokemonName.toLowerCase()
    useEffect(() => {
        //fetch pokemon from pokeapi
        fetch(`${pokeUrl}${lower}`)
            .then((response) => response.json())
            .then((result) => {
                setPokemon(result)
                
                setLoading(false)
            }).catch((err)=> {
            })
        }, [])
    if (loading) {
        return (<p>Loading...</p>)
    } else {
        return (
        <div className="pokemonCard">
            <img className="pokemonImage" src={pokemon.sprites.front_default} alt="pokemon sprite" />
            <div className="pokemonIdLevel">
                <div>#{("000" + pokemon.id).slice(-4)} </div><div>Lv. {props.pokemon.level}</div>
            </div>
            <div><h6>{props.pokemon.nickname ? <span>{props.pokemon.nickname} the </span>: <></>}{pokemon.name.charAt(0).toUpperCase() + pokemon.name.substr(1).toLowerCase()}</h6></div>
            <div id="sprite-wrapper">
            </div>
            <div id="level"></div>
            
            
        </div>
    )
    }
}

export default PokemonInTeam