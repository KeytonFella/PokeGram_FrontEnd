import React, {useEffect, useState} from 'react'
import "./PokemonInTeam.scss"

function PokemonInTeam(props: {pokemonName: String}) {
    console.log(props)
    //let loading = true
    let [pokemon, setPokemon] = useState({} as any)
    let [loading, setLoading] = useState(true)
    
    const pokeUrl = "https://pokeapi.co/api/v2/pokemon/"
    let lower = props.pokemonName.toLowerCase()
    useEffect(() => {
        //fetch pokemon from pokeapi
        fetch(`${pokeUrl}${lower}`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                setPokemon(result)
                
                setLoading(false)
            }).catch((err)=> {
                console.log(err)
            })
        }, [])
    if (loading) {
        return (<p>Loading...</p>)
    } else {
        return (
        <div className='card'>
            <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.substr(1).toLowerCase()}</h2>
            <div className='sprite'>
                <img src={pokemon.sprites.front_default} alt="pokemon sprite"></img>
            </div>
        </div>
    )
    }
}

export default PokemonInTeam