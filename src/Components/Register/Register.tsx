import axios from 'axios';
import React, { useState } from 'react'
import { RootState } from '../../utility/reduxTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../utility/store';
import { setUserInfo, setToken } from '../../utility/auth';
//import { useHistory } from 'react-router-dom';

function Register() {
    //const user = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch(); // Use AppDispatch for dispatching actions
    
    let [state, setState] = useState({
        username: "",
        password: ""
    })
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  //  const history = useHistory();

    async function handleSubmitRegister(event: any){
        //prevent the default behavior of refreshing the password
        event.preventDefault();
        // will call an axios request that returns the http response 
        //spread the response body that we can get everything but the 
        //res.message in the data response
        try {
          const response = await postRegister();
          console.log(state);
          if(response && response.data) {
            const {message, ...userObject} = response?.data;
            console.log(userObject);
          } else {
            console.log("Response is empty")
          }
        } catch (error) {
            console.log(error);
        }
        
        /* Calls a dispatch that will run the reducer/action we have defined 
            in '../../utility/auth'
        */
        //dispatch(setUserInfo(userObject));
    }

    /* useEffect(() => {
        if (username) {
          // Show the welcome message
          setShowWelcomeMessage(true);
          
          // Trigger an analytics event (example)
          // trackEvent('user_registered', { username });
    
          // Hide the welcome message after 5 seconds and redirect user
          const timer = setTimeout(() => {
            setShowWelcomeMessage(false);
            history.push('/dashboard'); // Redirect to dashboard
          }, 5000);
    
          // Cleanup function to clear the timer
          return () => clearTimeout(timer);
        }
      }, [username, history]);  // Dependency on username and history */

    function usernameChange(event: any){
        setState({...state, username: event.target.value});
    }

    function passwordChange(event: any){
        setState({...state, password: event.target.value});
    }


    async function postRegister(){
        const URL = "http://localhost:3000/users";
        const data = {username: state.username, password: state.password};
        try{
            const returnedData = await axios.post(URL, data);
            return returnedData;
        }catch(err){
            console.error(err);
        }
    }

  return (
    <>
        <br/>
        <form onSubmit={handleSubmitRegister}>
            <input type="text" placeholder='username' onChange={usernameChange}></input>
            <br/>
            <input type="text" placeholder='password' onChange={passwordChange}></input>
            <br/>
            <button type="submit">Register</button>
        </form>
        <br/>
    </>
  )
}

export default Register