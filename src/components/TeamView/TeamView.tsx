import React, { useState} from 'react'
import axios from 'axios'
import './TeamView.scss'
import PokemonInTeam from '../PokemonInTeam/PokemonInTeam'
import { useSelector } from 'react-redux'
import { RootState } from '../../utility/reduxTypes'; // Import your RootState type
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../utility/auth'; // Im+
import { AppDispatch } from '../../utility/store';

function TeamView() {
   
    
    
    
    type Pokemon = {
        pokemonName: String,
        level: Number,
        nickname?: String
        }

    let [state, setState] = useState({
        loading: true,
        team_id: "",
        team_name: "",
        pokemon_list: []
    })


    //test id
    const id = "fe12456f-137f-4969-9732-cc08bdf67ba1" 
    const url = `http://localhost:5500/api/teams/${id}`

    
    React.useEffect(() => {
        axios.get(url).then((response) => {
            console.log('Data: ', response.data);
            const team = response.data.body
            console.log('Team: ', team)
            console.log("Pokemon list: " + team.pokemonList)
            
            
            setState({...state, loading: false, team_id: team.team_id, team_name: team.name, pokemon_list: team.pokemonList})
            
        }
    ).catch((err) => {
        console.error('Error:', err);
    })
    }, [])

    
    
      
    if (state.loading) {
        return(<div>loading...</div>)
    } else {
    return (
        <div>
            <h1>{state.team_name}</h1>
            <div>
                {state.pokemon_list.map((pokemon: Pokemon) => 
                //pokemon get rendered here
                <PokemonInTeam pokemonName={pokemon.pokemonName}/>
                )}
            </div>
        </div>
    )
    }
}

export default TeamView
export {}