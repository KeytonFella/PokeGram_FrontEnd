import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import { useDisplayError } from '../../Hooks/DisplayError';
import axios from 'axios';
import { useShowUserMessage } from '../../Hooks/DisplayAndRedirect';
import { Link } from 'react-router-dom';

function Friends() {
    interface ReqBody {
        friend_key?: string | null,
        key_type?: string | null
    }

    const authState = useSelector((state: RootState) => state.auth); //lets use the redux store
    /* const URL = `http://52.90.96.133:5500/api/users/${authState.user_id}/friends`; */
    const URL = `http://localhost:5500/api/users/${authState.user_id}/friends`;
    
    const headers = {
        'Authorization': `Bearer ${authState.token}`
    }
    const [errorMessage, setErrorMessage] = useDisplayError();
    const [userMessage, setUserMessage] = useShowUserMessage();
    const [friendsList, setFriendsList] = useState<any[]>([]);

    //might delete/modify
    let [state, setState] = useState({
        friend_key : ""
    });
   
    //gets the users friends list in a get axios req
    async function getFriends() {
        try {
            return await axios.get(URL, { headers });
        } catch (err) {
            const error = err as any;
            //console.error("printting axios error:", err);
            if (error && error.response) {
                console.log(error);
                return error.response;
            }
            return null;
        }
    }

    //adds the users to friends list in post axios req
    async function postFriend(body: ReqBody) {
        try {
            return await axios.put(URL, body, { headers });
        } catch (err) {
            const error = err as any;
            //console.error("printting axios error:", err);
            if (error && error.response) {
                console.log(error);
                return error.response;
            }
            return null;
        }
    }

    //Deletes the users from friends list in post axios req
    /* Delete a friend of the current logged in user if  
        -Valid id/username of friend as well as the key type is valid
        -Not trying to delete themselves
        -The friend actually exists on the users friends list 
    */
    async function deleteFriend(body: ReqBody) {
        try {
            return await axios.delete(URL, { headers, data: body });
        } catch (err) {
            const error = err as any;
            //console.error("printting axios error:", err);
            if (error && error.response) {
                console.log(error);
                return error.response;
            }
            return null;
        }
    }

    //handles all the buttons and executes corresponding action by calling a axios request
    // depending on the button value
    async function handleFriendForm(event: any) {
        event.preventDefault(); // prevent default form submission
        //if global redux values are not init
        if (!(authState.user_id || authState.token || authState.username)) {
            console.log("missing an AuthState value: token, user_id, or username");
            setErrorMessage("missing an AuthState value: token, user_id, or username");
            return;
        }

        //the value of the button grabbed by its value prop
        const clickedButton = event?.target?.value;
        console.log("clicked", clickedButton);
        console.log(event);


        //using the clicked button from the form's value we check what the key type is 
        //and do the according action
        let response = null;

        if (clickedButton === "getFriends") {
            console.log("get all friends");
            response = await getFriends();
        } 

        let localReqBody: ReqBody = {};
        if (clickedButton === "addUserId") {
            localReqBody = { friend_key: state.friend_key, key_type: "user_id" };
        } else if (clickedButton === "addUsername") {
            localReqBody = { friend_key: state.friend_key, key_type: "username" };
        } else if (clickedButton === "deleteUsername") {
            localReqBody = { friend_key: state.friend_key, key_type: "username" };
        } else if (clickedButton === "deleteUserId") {
            localReqBody = { friend_key: state.friend_key, key_type: "user_id" };
        }

        console.log("local reqbody", localReqBody);
        
        // Perform the action based on the localReqBody.
        
        if (clickedButton === "getFriends") {
            response = await getFriends();
        } else if (["addUserId", "addUsername"].includes(clickedButton)) {
            response = await postFriend(localReqBody);
        } else if (["deleteUsername", "deleteUserId"].includes(clickedButton)) {
            response = await deleteFriend(localReqBody);
        }

        
        console.log("response", response);
        console.log("response status", response?.status);

        console.log("response data.friends", response?.data?.friendsList);

        //will print out the error if not successful 
        if (response?.status !== 200 && response?.status !== 201) {
            console.log("err response status is ", response?.status);
            console.log("err the response data message", response?.data?.message);
            setErrorMessage(response?.data?.message || "some error");
            console.log(errorMessage)
            return;
        }

        //Set the friends list so we can render and display a success message
        const friends = response?.data?.friendsList;
        console.log("friends list", friends);
        if (friends) {
            setFriendsList(friends);
            console.log(friendsList);
            setUserMessage({
                message: response?.data?.message,
                username: authState?.username
            });
        }
        
    }

    //handles input text change. Records textbox but only if theres a keystroke
    function handleFormInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target; //takes the inputs name: and takes the value of the event
        setState(prevState => ({ ...prevState, [name]: value })); //spreading allows us to edit the properties we want without losing the ones we didnt
        console.log(state);
    }


    return (
        <>
            <div>Friends</div>
            <p>Hello, {authState.username}</p>
            <p>ID: {authState.user_id}</p><br />
            <form>
                <button type="button" name="get-friends" value="getFriends" onClick={handleFriendForm}>Get your friends list</button><br /><br />
                <input type="text" name="friend_key" placeholder="Friends ID Or Username" onChange={handleFormInputChange}></input>
                <button type="button" name="add-friend-id" value="addUserId" onClick={e => handleFriendForm(e)}>Add by Id</button>
                <button type="button" name="add-friend-username" value="addUsername" onClick={e => handleFriendForm(e)} >Add by username</button><br />
                <button type="button" name="delete-friend-username" value="deleteUsername" onClick={e => handleFriendForm(e)}>Delete by username</button>
                <button type="button" name="delete-friend-id" value="deleteUserId" onClick={e => handleFriendForm(e)} >Delete by Id</button>
            </form>


            {errorMessage}
            {/* The code below renders only if userMessage.message has change */}
            {userMessage.message && <p>{userMessage.message} for {userMessage.username}</p>}


            
            <ul>
                {friendsList.map((friend, index) => (
                    <li key={index}>
                        Username: <Link to={`/api/users/${friend.username}`}>{friend.username}</Link><br />
                        User ID: <Link to={`/api/users/${friend.user_id}`}>{friend.user_id}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Friends


