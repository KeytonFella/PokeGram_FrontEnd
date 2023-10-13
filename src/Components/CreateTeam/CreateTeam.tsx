import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utility/reduxTypes'; // Import your RootState type
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../utility/auth'; // Im+
import { AppDispatch } from '../../utility/store';
import axios from 'axios';


function CreateTeam() {
    const AuthState = useSelector((state: RootState) => state.auth)
    const dispatch: AppDispatch = useDispatch();

    const [team, setTeam] = useState({
        teamName: "",
        pokemonList: [""]
    })

    const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setTeam((team) => ({
            ...team,
            [name]: value
        }))
    }

    const handlePokemonListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setTeam((team) => ({ 
            ...team,
            [name]: value
        }))
    }

    async function handleSubmit() {
        const userInfo = {
            name: "poketrainer",
            user_id: "42b34474-666d-4c18-a0bf-6474bbb2f342",
            token: "sha256-23"
        }
        dispatch(setUserInfo(userInfo))
        const newTeam = {teamName: team.teamName, pokemonList: team.pokemonList, user_id: userInfo.user_id}
        console.log('fetching...')
        // fetch('http://localhost:5500/teams', {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(newTeam)
        // })
        try { 
            
            const response = await axios.post('http://localhost:5500/api/teams', newTeam)
            console.log("Successfully posted data: ", response.data)
        } catch(err) {
            
            console.error('Error: ', err)
        }
        
    }
    //TODO: Implement team without splitting by space
    return (
        <div>
            <h1>Create Team</h1>
            <form>
                <label>Team Name:
                    <input type="text" name="teamName" value={team.teamName} onChange={handleTeamNameChange}/>
                </label>
                <label>Pokemon:
                    <input type="text" name="pokemon" onChange={handlePokemonListChange}/>
                </label>
                <br/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default CreateTeam