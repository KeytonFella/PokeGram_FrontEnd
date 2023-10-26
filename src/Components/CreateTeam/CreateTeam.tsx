import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utility/reduxTypes'; // Import your RootState type
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../utility/auth'; // Im+
import { AppDispatch } from '../../utility/store';
import axios from 'axios';
import { Pokemon } from '../../utility/PokemonType';
import { useShowUserMessage } from '../../Hooks/DisplayAndRedirect';
import { useDisplayError } from '../../Hooks/DisplayError';


function CreateTeam() {
    const AuthState = useSelector((state: RootState) => state.auth)
    const dispatch: AppDispatch = useDispatch();
    
        

    const [teamName, setTeamName] = useState('')
    const [errorMessage, setErrorMessage] = useDisplayError()
    const [userMessage, setUserMessage] = useShowUserMessage(undefined, '/profiles', 6000)
    const [pokemonList, setPokemonList] = useState([{} as Pokemon])
    

    const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setTeamName(value)
        console.log(teamName)
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {

        const {name, value} = e.target;
        const newList = [...pokemonList]
        newList[index] = {...newList[index], [name]: value}

        setPokemonList(newList)
        
    }

    const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const {name, value} = e.target;
        const newList = [...pokemonList]
        newList[index] = {...newList[index], [name]: parseInt(value)}
        setPokemonList(newList)
        
    } 

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const {name, value} = e.target;
        const newList = [...pokemonList]
        newList[index] = {...newList[index], [name]: value}
        setPokemonList(newList)

    }

    // Add another pokemon to the team
    const handleAddPokemon = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        console.log('adding')
        
        // Make sure pokemon team size doesnt exceed 6
        if(pokemonList.length < 6) {
            setPokemonList([...pokemonList, {} as Pokemon])
        }
        console.log(`pokemon list length: ${pokemonList.length}`)
        return pokemonList
    }
    async function postTeam(userInfo: any) {
        const team = {teamName: teamName, pokemonList: pokemonList, user_id: userInfo.user_id}
        const headers = {
            'Authorization': `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json'
        }
        try{
            const response = await axios.post('https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/teams', team, {headers: headers})
            
            return response;
        
        } catch(err) {
            const error = err as any;
            if(error && error.response) {
                return error.response
            }
            return
            //console.log(err)
            // setErrorMessage(err)
        }
    }
    async function handleSubmit(event: any) {
        event.preventDefault()
        const userInfo = {
            name: AuthState.name,
            username: AuthState.username,
            user_id: AuthState.user_id,
            token: AuthState.token
        }
        dispatch(setUserInfo(userInfo))
        
        //const newTeam = {teamName: teamName, pokemonList: pokemonList, user_id: userInfo.user_id}
        console.log('fetching...')
        const response = await postTeam(userInfo)
        if(response?.status === 400 || response.data.errorMessage) {
            setErrorMessage(response.data.errorMessage || "error")
            return
        }
        try {
            
            setUserMessage({message: "Successfully created team!", username: userInfo.username})
            return
        } catch(err) {
            console.log(err)
        }
    }
    
    return (
        <div>
            <h1>Create Team</h1>
            <form>
                <label>Team Name:
                    <input type="text" name="teamName" value={teamName} onChange={handleTeamNameChange}/>
                </label>
                <br></br>
                <label>Pokemon List:
                    <ul>
                        {pokemonList.map((pokemon: Pokemon, index) => {
                        return (
                        <div key={index}>
                            <label>Pokemon:
                                <br></br>
                                <input required type="text" name="pokemonName" placeholder="Pikachu" value={pokemonList[index].pokemonName} onChange={(e) => handleNameChange(e, index)}/>
                            </label>
                            
                            <label>Level:
                                <br></br>
                                <input required type="number" name="level" value={pokemonList[index].level}  placeholder="1-100" min='1' max='100' onChange={(e) => handleLevelChange(e, index)}/>
                            </label>
                        
                            <label>Nickname(Optional):
                                <br></br>
                                <input type="text" name='nickname' value={pokemonList[index].nickname} onChange={(e) => handleNicknameChange(e, index)}/>
                            </label>
                        </div>
                        
                        )})}
                        
                    </ul>
                </label>
                <br/>
                <button onClick={handleAddPokemon}>Add Pokemon</button>
                <br/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
            <div className='showMessage'>
                {<p>{errorMessage} </p>}
                {<p>{userMessage?.message}</p>}
                {userMessage?.message && <p>Redirecting {userMessage.username} to the profile page</p>}
            </div>
        </div>
    )
}

export default CreateTeam
