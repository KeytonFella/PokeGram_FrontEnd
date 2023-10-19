import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utility/reduxTypes'; // Import your RootState type
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../utility/auth'; // Im+
import { AppDispatch } from '../../utility/store';
import axios from 'axios';
import { Pokemon } from '../../utility/PokemonType';

function EditTeam() {
    const AuthState = useSelector((state: RootState) => state.auth)
    const dispatch: AppDispatch = useDispatch();
    const [state, setState] = useState({
        loading: true,
        logged_in: false,
        teamName: ''
    })
    // const [teamName, setTeamName] = useState('')
    const [pokemonList, setPokemonList] = useState([{} as Pokemon])
    useEffect(() => {
        if(AuthState.user_id && AuthState.username && AuthState.token){
            setState({...state, logged_in: true})
            
            const url = `http://52.90.96.133:5500/api/teams/${AuthState.user_id}`
            
            //Configured axios get request
            axios.get(url, {headers: {Authorization: `Bearer ${AuthState.token}`}}).then((response) => {
                console.log('Data: ', response.data);

                const team = response.data.body
                console.log('Team: ', team)
                console.log("Pokemon list: " + team.pokemonList)
                setState({...state, loading: false, teamName: team.teamName})
                setPokemonList(team.pokemonList)
            

            }).catch((err) => {
                console.error('Error:', err);
            })
        } else {
            console.log('not logged in')
            setState({...state, loading: false})
        }
    
    }, [])

    
    

    const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState({...state, teamName: value})
        console.log(state.teamName)
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

    const handleDeletePokemon = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        // event.preventDefault()
        console.log ('deleting')
        const newList = pokemonList
        newList.splice(index, 1)
        setPokemonList(newList)
        return pokemonList
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
        
        const newTeam = {teamName: state.teamName, pokemonList: pokemonList, user_id: userInfo.user_id}
        console.log('fetching...')
        
        try { 
            const headers = {
                'Authorization': `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json'
            }
            const response = await axios.put(`http://52.90.96.133:5500/api/teams/${userInfo.user_id}`, newTeam, {headers: headers})
            console.log("Successfully posted data: ", JSON.stringify(response.data))
            return response;
        } catch(err) {
            
            console.error('Error: ', err)
        }
        
    }
    
    return (
        <div>
            <h2>Edit Team</h2>
            <form>
                <label>Team Name:
                    <input type="text" name="teamName" value={state.teamName} onChange={handleTeamNameChange}/>
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
                            <button onClick={(e) => handleDeletePokemon(e, index)}>Delete</button>
                        </div>
                        
                        )})}
                        
                    </ul>
                </label>
                <br/>
                <button onClick={handleAddPokemon}>Add Pokemon</button>
                <br/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default EditTeam
export {}