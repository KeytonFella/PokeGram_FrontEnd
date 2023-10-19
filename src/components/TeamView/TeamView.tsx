import React, { useState} from 'react'
import axios from 'axios'
import './TeamView.scss'
import PokemonInTeam from '../PokemonInTeam/PokemonInTeam'
import { useSelector } from 'react-redux'
import { RootState } from '../../utility/reduxTypes'; // Import your RootState type
import { useDispatch } from 'react-redux';
import auth, { setUserInfo } from '../../utility/auth'; // Im+
import { AppDispatch } from '../../utility/store';
import CreateTeam from '../CreateTeam/CreateTeam'
import { Link } from 'react-router-dom'

function TeamView() {
    const authState = useSelector((state: RootState) => state.auth)
    
    
    type Pokemon = {
        pokemonName: string,
        level: number,
        nickname?: string
        }

    let [state, setState] = useState({
        loading: true,
        teamExists: false,
        logged_in: false,
        
        team_name: "",
        pokemon_list: [{} as Pokemon]
    })

    
    
    
    React.useEffect(() => {
        
        if(authState.user_id && authState.username && authState.token){
            setState({...state, logged_in: true})
            
            const url = `http://52.90.96.133:5500/api/teams/${authState.user_id}`
            
            //Configured axios get request
            axios.get(url, {headers: {Authorization: `Bearer ${authState.token}`}}).then((response) => {
                console.log('Data: ', response.data);
                
                
                //check if user has a team created
                if (Object.keys(response.data).length === 0) {
                    // user does not have a team
                    setState({...state, teamExists: false, loading: false})
                }else{
                    const team = response.data.body
                    console.log('Team: ', team)
                    console.log("Pokemon list: " + team.pokemonList)
                    setState({...state, loading: false, teamExists: true, team_name: team.teamName, pokemon_list: team.pokemonList})
                } 

            }).catch((err) => {
                console.error('Error:', err);
            })
        } else {
            setState({...state, loading: false})
        }
    }, [])

    
    
    if (state.logged_in) {  
            if (state.loading) {
                return(<div>loading...</div>)
            } else if(state.teamExists){
                return (
                    <div>
                        <h2>{state.team_name}</h2>
                        <div>
                            {state.pokemon_list.map((pokemon: Pokemon) => 
                            //pokemon get rendered here
                            <PokemonInTeam pokemon={pokemon}/>
                            )}
                        </div>
                        <Link to='/editTeam'><button>Edit</button></Link>
                    </div>
                )
            } else {
                // Render CreateTeam if the user doesnt have a team
                return(<CreateTeam />)
            }
    } else {
        return <h4>Please Login to view or create your team</h4>
    }
    
}

export default TeamView
export {}