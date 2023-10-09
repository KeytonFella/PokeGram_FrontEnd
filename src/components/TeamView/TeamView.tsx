import React, { useState} from 'react'
import axios from 'axios'
import './TeamView.css'

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
    
    React.useEffect(() => {

    axios.get(url).then((response) => {
            
        console.log('Data: ', response.data);
        const team = response.data.body
        console.log('Team: ', team)
        setState({...state, loading: false, team_id: team.team_id, team_name: team.name, pokemon_list: team.pokemonList})
            
    }).catch((err) => {
        console.error('Error:', err);
    })
    }, [])
    
      
    if (state.loading) {
        return(<div>loading...</div>)
    } else {
    return (
        <div>
            <p>TEAMVIEW TEST</p>
            <p>{state.team_name}</p>
            <ul>
                {state.pokemon_list.map((pokemon) => 
                <p>{pokemon}</p>)}
            </ul>
        </div>
    )
    }
}

export default TeamView
export {}