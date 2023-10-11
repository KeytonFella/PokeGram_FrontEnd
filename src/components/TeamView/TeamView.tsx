import React, { useState} from 'react'
import axios from 'axios'
import './TeamView.css'
import PokemonInTeam from '../PokemonInTeam/PokemonInTeam'

function TeamView() {
    let [state, setState] = useState({
        loading: true,
        team_id: "",
        team_name: "",
        pokemon_list: []
    })


    //test id
    const id = "806075bc-44be-4486-a2a2-86c85b929ab9" 
    const url = `http://localhost:3000/teams/${id}`

    // var requestOptions = {
    //     method: "GET",
    //     redirect: "follow"
    // }

    
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
                {state.pokemon_list.map((pokemon) => 
                //pokemon get rendered here
                <PokemonInTeam key={state.pokemon_list.indexOf(pokemon)} pokemonName={pokemon}/>
                )}
            </div>
        </div>
    )
    }
}

export default TeamView
export {}