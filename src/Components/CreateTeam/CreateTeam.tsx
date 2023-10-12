import React, {useState} from 'react'

function CreateTeam() {
    const [team, setTeam] = useState({
        teamName: "",
        pokemonList: [""]
    })

    function handleSubmit() {
        const newTeam = {teamName: team.teamName, pokemonList: team.pokemonList}
        fetch('http://localhost:5500/teams', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newTeam)
        })
    }
    //TODO: Implement team without splitting by space
    return (
        <div>
            <h1>Create Team</h1>
            <form>
                <label>Team Name:
                    <input type="text" value={team.teamName} onChange={(i) => setTeam({...team, teamName: i.target.value})}/>
                </label>
                <label>Pokemon(separate by spaces):
                    <input type="text" onChange={(i) => setTeam({...team, pokemonList: i.target.value.split(' ')})}/>
                </label>
                <br/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default CreateTeam