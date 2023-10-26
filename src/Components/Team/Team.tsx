import React, {useState} from 'react'
import { Pokemon } from '../../utility/PokemonType'
import PokemonInTeam from '../PokemonInTeam/PokemonInTeam'
import { useSelector } from 'react-redux'
import { RootState } from '../../utility/reduxTypes'
import axios from 'axios'
// View the team from the profile
function Team(props: any) {
    const [state, setState] = useState({
        team_name: "",
        pokemon_list: [{} as Pokemon],
        loading: true,
        teamExists: true
    })

    const AuthState = useSelector((state: RootState) => state.auth)
    React.useEffect(() => {
        
        if(AuthState.user_id && AuthState.username && AuthState.token){
            
            const url = `https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/teams/${props.team_user_id}`
            
            
            //Configured axios get request
            axios.get(url, {headers: {Authorization: `Bearer ${AuthState.token}`}}).then((response) => {
                console.log('Data: ', response.data);
                
                
                //check if user has a team created
                if (Object.keys(response.data).length === 0) {
                    // User does not have a team
                    setState({...state, teamExists: false, loading: false})
                }else{
                    const team = response.data.body.Item
                    console.log('Team: ', team)
                    console.log("Pokemon list: " + team.pokemonList)
                    setState({...state, loading: false, team_name: team.teamName, pokemon_list: team.pokemonList})
                } 

            }).catch((err) => {
                console.error('Error:', err);
            })
        } else {
            setState({...state, loading: false})
        }
    }, [])


    if(state.loading) {
        return (<div>Loading...</div>)
    } else if(!state.teamExists){
        return (<h2>User has not created a pokemon team</h2>)
    } else {
        return (
            <div>
                <h2 id='teamname'>{state.team_name}</h2>
                <div id="pokemonlist">
                    {state.pokemon_list.map((pokemon: Pokemon, index: number) => 
                    //pokemon get rendered here
                    <PokemonInTeam pokemon={pokemon} key={index}/>
                    )}
                </div>
            </div>
        )
    }
}

export default Team
export {}