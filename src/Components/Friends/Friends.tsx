import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import { useDisplayError } from '../../Hooks/DisplayError';
import axios from 'axios';
import { useShowUserMessage } from '../../Hooks/DisplayAndRedirect';
import { Link } from 'react-router-dom';
import FriendCard from '../FriendCard/FriendCard';
import "./Friends.scss";

function Friends() {
    interface ReqBody {
        friend_key?: string | null,
        key_type?: string | null
    }

    interface FriendProfile {
        user_id: string | null,
        username: string | null,
        image_url: string | null,
        bio: string | null
    }

    const authState = useSelector((state: RootState) => state.auth); //lets use the redux store
    const URL = `https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/users/${authState.user_id}/friends`;
    /*     const URL = `http://localhost:5500/api/users/${authState.user_id}/friends`;
     */
    const headers = {
        'Authorization': authState.token
    }
    const [errorMessage, setErrorMessage] = useDisplayError();
    const [userMessage, setUserMessage] = useShowUserMessage();
    const [friendList, setFriendsList] = useState<FriendProfile[]>([]);
    const [shouldUpdateFriends, setShouldUpdateFriends] = useState(false);

    //might delete/modify
    let [state, setState] = useState({
        friend_key: ""
    });

    // useEffect to fetch friends if shouldUpdateFriends is true
    useEffect(() => {
        if (shouldUpdateFriends) {
        getFriends().then(() => {
            setShouldUpdateFriends(false);  // Reset back to false
        });
        }
  }, [shouldUpdateFriends]);
    
    useEffect(() => {
        getFriends();
    }, []);

    //gets the users friends list in a get axios req
    async function getFriends() {
        try {
            const response = await axios.get(URL, { headers});
            console.log(response);
            const friendsList = response?.data?.friendsList
            console.log("friends list in get Friends is ", friendsList);
            if (Array.isArray(friendsList)) {


                console.log("state friends list", friendsList)
                const updatedFriendsList: FriendProfile[] = [];

                try {

                    //fill in the rest of the friendsList attributes using a map
                    for (const friend of friendsList) {
                        console.log("getting profile");
                        if (friend.user_id) {
                            const profile = await getFriendProfile(friend.user_id);
                            console.log(profile?.data?.image_url);
                            console.log("the Bio", profile?.data?.bio);
                            const updatedFriend: FriendProfile = {
                                user_id: friend.user_id,
                                username: profile?.data?.username || friend.username,
                                image_url: profile?.data?.image_url || friend.image_url,
                                bio: profile?.data?.bio || friend.bio
                            };
                            updatedFriendsList.push(updatedFriend);
                        }
                    }
                    console.log("updatefriendslist", updatedFriendsList);
                    setFriendsList(JSON.parse(JSON.stringify(updatedFriendsList)));

                    console.log("state friends list", friendsList)
                } catch (error) {
                    setErrorMessage("error setting friends profiles");
                }

                return friendsList;
            } else {
                setErrorMessage("error grabbing list");
            }


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
    //gets the users profile in a get axios req
    async function getFriendProfile(uid: string) {
        const profileInfo = await axios.get(`https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/profiles/${uid}`, {
            headers: {
                'Authorization': authState.token,
                'Content-Type': 'application/json'
            }
        })
        console.log("friends profile info is", profileInfo);
        return profileInfo;
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

    async function removeFriendHandler(userId: string | null) {
        const friendId =  userId;
        console.log(friendId);
        const localReqBody: ReqBody = { friend_key: friendId, key_type: "user_id" };
        const response = await deleteFriend(localReqBody);

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
        console.log("friends list in remove handler", friends);
        if (friends) {
            console.log(friendList);
            setUserMessage({
                message: response?.data?.message,
                username: authState?.username
            });
        }
        setShouldUpdateFriends(true);
    }

    //checks to make sure global store is init
    function authCheck(){
        if (!(authState.user_id || authState.token || authState.username)) {
            console.log("missing an AuthState value: token, user_id, or username");
            setErrorMessage("missing an AuthState value: token, user_id, or username");
            return;
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
            return;
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

        if (["addUserId", "addUsername"].includes(clickedButton)) {
            response = await postFriend(localReqBody);
        } else if (["deleteUsername", "deleteUserId"].includes(clickedButton)) {
            response = await deleteFriend(localReqBody);
        }


        console.log("response", response);
        console.log("response data", response?.data);

        //will print out the error if not successful 
        if (response?.status !== 200 && response?.status !== 201) {
            console.log("err response status is ", response?.status);
            console.log("err the response data message", response?.data?.message);
            setErrorMessage(response?.data?.message || "some error");
            console.log(errorMessage)
            return;
        }

        //Set the friends list so we can render and display a success message
        const friends = response?.data?.friendResponse;
        console.log("friends list in forhandler", friends);
        if (friends) {
            setFriendsList(friends);
            console.log(friendList);
            setUserMessage({
                message: response?.data?.message,
                username: authState?.username
            });
        }
        
        setShouldUpdateFriends(true);
    }

    //handles input text change. Records textbox but only if theres a keystroke
    function handleFormInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target; //takes the inputs name: and takes the value of the event
        setState(prevState => ({ ...prevState, [name]: value })); //spreading allows us to edit the properties we want without losing the ones we didnt
        console.log(state);
    }



    /* async function getFriendsProfile(event: any){
        const profileInfo = await axios.get(`http://52.90.96.133:5500/api/profiles/${friendsList.user_id}`, {
                    headers: { 
                        'Authorization': `Bearer ${authState.token}`,
                        'Content-Type': 'application/json'}
                })
    } */


    return (
        <>
        <div className='friends-header'>
            <div id='friend-div'>{authState.username}'s Friends</div>

            
        </div>

        <div className='friends-flex-body'>

        </div>

            <form id="add-friend-form">
               
                <input type="text" id='friend-searchbar' name="friend_key" placeholder="Friends ID Or Username" onChange={handleFormInputChange}></input>
                <div className='add-button-container'>
                    <button type="button" className="friendButton" name="add-friend-id" value="addUserId" onClick={e => handleFriendForm(e)}>Add by Id</button>
                    <button type="button" className="friendButton" name="add-friend-username" value="addUsername" onClick={e => handleFriendForm(e)} >Add by username</button><br />
                </div>
                <div className='delete-button-container'>
                    <button type="button" className="friendButton" name="delete-friend-username" value="deleteUsername" onClick={e => handleFriendForm(e)}>Delete by username</button>
                    <button type="button" className="friendButton" name="delete-friend-id" value="deleteUserId" onClick={e => handleFriendForm(e)} >Delete by Id</button>
                </div>
            </form>


            <div id='friend-cards-container'>
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                        {friendList.map((friend, index) => (
                            <div className="col" key={index}>
                                <FriendCard username={friend.username} userId={friend.user_id} imgSrc={friend.image_url} bio={friend.bio} removeFriendHandler = {removeFriendHandler} />
                            </div>
                        ))}
                 </div>   
            </div>

        </>
    )
}

export default Friends


