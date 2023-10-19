import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import { useDisplayError } from '../../Hooks/DisplayError';
import axios from 'axios';
import { useShowUserMessage } from '../../Hooks/DisplayAndRedirect';

function Friends() {

    const authState = useSelector((state: RootState) => state.auth); //lets use the redux store
    const [errorMessage, setErrorMessage] = useDisplayError();
    const [userMessage, setUserMessage] = useShowUserMessage();
    const [friendsList, setFriendsList] = useState<any[]>([]);
    let [state, setState] = useState({
        username: "",
        user_id: "",
    });


    async function handleGetAllFriends(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        if(!(authState.user_id || authState.token || authState.username)){
            console.log("missing an AuthState valu: token, user_id, or username");
            setErrorMessage("Missing username or password");
            return;
        }

        const response = await getFriends();
        if(response?.status === 400){
            console.log("response status is ", JSON.stringify(response.status));
            console.log("the response data ",response.data);
            setErrorMessage(response.data || "some error");
            return;
        }
        if(response?.status === 404){
            setErrorMessage("404 Error Not found");
            return;
        }
        if(response?.status === 401){
            setErrorMessage("401 Error Not Authorized");
            return;
        }
        console.log(response);
        const friends = response?.data?.friendsList;
        if(friends && response?.status === 200){
            setFriendsList(friends);
            setUserMessage({
                message: response?.data?.message, 
                username: authState?.username});
        }
    }

    async function handleGetFriendsById(event: any){

    }
    async function handleGetFriendsByUsername(event: any){

    }
    async function handlePostFriendById(event: any){

    }
    async function handlePostFriendByUsername(event: any){

    }
    
    //gets the users friends list
    async function getFriends() {
        const headers = {
            'Authorization': `Bearer ${authState.token}`
        }
        try {
            const URL = `http://localhost:5500/api/users/${authState.user_id}/friends`;
            return await axios.get(URL, {headers});
        } catch (err) {
            const error = err as any;
            //console.error("printting axios error:", err);
            if(error && error.response){
                console.log(error);
                return error.response; 
            }
            return null;
        }
    }

    function handleFormInputChange(event: React.ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target; //takes the inputs name: and takes the value of the event
        setState(prevState => ({ ...prevState, [name]: value })); //spreading allows us to edit the properties we want without losing the ones we didnt
    }

    return (
        <>
        <div>Friends</div>
        <p>Hello, {authState.username}</p>
        <p>ID: {authState.user_id}</p><br />
        <button type="button" name="get-friends" onClick={handleGetAllFriends}>Get your friends list</button>
        <br /><br />
        <form onSubmit={handleGetFriendsById}>
            <input type="text" name="user-id" placeholder="User ID" onChange={handleFormInputChange}></input>
            <button type="submit" name="submit-user-id">Get Users Friends</button>
        </form>
        <form onSubmit={handleGetFriendsByUsername}>
            <input type="text" name="username" placeholder="Username" onChange={handleFormInputChange}></input>
            <button type="submit" name="submit-username">Get Users Friends</button>
        </form>
        <form onSubmit={handlePostFriendById}>
            <input type="text" name="post-id" placeholder="Friends ID" onChange={handleFormInputChange}></input>
            <button type="submit" name="submit-friend-id">Add a Friend</button>
        </form>
        <form onSubmit={handlePostFriendByUsername}>
            <input type="text" name="post-username" placeholder="Friends Username" onChange={handleFormInputChange}></input>
            <button type="submit" name="submit-friend-username">Add a Friend</button>
        </form>

        {<p>{errorMessage}</p>}
        {/* The code below renders only if userMessage.message has change */}
        {userMessage.message && <p>{userMessage.message} for {userMessage.username}</p>}


    
      <ul>
        {friendsList.map((friend, index) => (
            <li key={index}>
                Username: {friend.username}<br/>
                User ID: {friend.user_id}
            </li>
        ))}
      </ul>
    </>
  )
}

export default Friends