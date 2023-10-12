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
    const AuthState = useSelector((state: RootState) => state.auth)
    const dispatch: AppDispatch = useDispatch();
    
    const userInfo = {
        name: "pokeTrainer",
        user_id: "2b34474-666d-4c18-a0bf-6474bbb2f342",
        token: "sha256-23"
    }
    dispatch(setUserInfo(userInfo))
    type Pokemon = {
        name: String,
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
    const id = "079821a3-3262-4b0e-b8fe-3a1022727e82" 
    const url = `http://localhost:3000/teams/${id}`

    

    
    React.useEffect(() => {
    
        axios.get(url).then((response) => {
                
            console.log('Data: ', response.data);
            const team = response.data.body
            console.log('Team: ', team)
            console.log("pokemon list: " + team.pokemonList)
            
            
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
                <PokemonInTeam pokemonName={pokemon.name}/>
                )}
            </div>
        </div>
    )
    }
}

export default TeamView
export {}