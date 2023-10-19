import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utility/reduxTypes'; // Import your RootState type
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../utility/auth'; // Im+
import { AppDispatch } from '../../utility/store';
import axios from 'axios';
import { Pokemon } from '../../utility/PokemonType';

function EditTeam(props: {teamName: String, pokemonList: Pokemon[]}) {
    const AuthState = useSelector((state: RootState) => state.auth)
    const dispatch: AppDispatch = useDispatch();
    
        

    const [teamName, setTeamName] = useState('')
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
    // const handlePokemonListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const {name, value} = e.target;
    //     setTeam((team) => ({ 
    //         ...team,
    //         [name]: value
    //     }))
    // }

    // Add another pokemon to the team
    const handleAddPokemon = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        console.log('adding')
        //const newMon = {name: '', level: null}
        
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
        //const splitList = team.pokemonList.split(' ')
        //console.log(splitList)
        const newTeam = {teamName: teamName, pokemonList: pokemonList, user_id: userInfo.user_id}
        console.log('fetching...')
        // fetch('http://localhost:5500/teams', {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(newTeam)
        // })
        try { 
            const headers = {
                'Authorization': `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json'
            }
            const response = await axios.put(`http://localhost:5500/api/teams/${userInfo.user_id}`, newTeam, {headers: headers})
            console.log("Successfully posted data: ", JSON.stringify(response.data))
            return response;
        } catch(err) {
            
            console.error('Error: ', err)
        }
        
    }
    
    return (
        <div>
            <h1>Edit Team</h1>
            <form>
                <label>Team Name:
                    <input type="text" name="teamName" value={teamName} onChange={handleTeamNameChange}/>
                </label>
                <br></br>
                <label>Pokemon List:
                    <ul>
                        {props.pokemonList.map((pokemon: Pokemon, index) => {
                        return (
                        //<PokemonInput key={index} name={pokemon.name} level={pokemon.level} nickname={pokemon.name}/>)
                        <div key={index}>
                            <label>Pokemon:
                                <br></br>
                                <input required type="text" name="pokemonName" placeholder="Pikachu" value={props.pokemonList[index].pokemonName} onChange={(e) => handleNameChange(e, index)}/>
                            </label>
                            
                            <label>Level:
                                <br></br>
                                <input required type="number" name="level" value={props.pokemonList[index].level}  placeholder="1-100" min='1' max='100' onChange={(e) => handleLevelChange(e, index)}/>
                            </label>
                        
                            <label>Nickname(Optional):
                                <br></br>
                                <input type="text" name='nickname' value={props.pokemonList[index].nickname} onChange={(e) => handleNicknameChange(e, index)}/>
                            </label>
                            <button onClick={(e) => handleDeletePokemon(e, index)}>Delete</button>
                        </div>
                        //<p>test item</p>
                        
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