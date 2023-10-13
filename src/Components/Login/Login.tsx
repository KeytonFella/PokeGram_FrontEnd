import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AuthState } from '../../utility/reduxTypes';
import { AppDispatch } from '../../utility/store';
import { setUserInfo, setToken } from '../../utility/auth';


function Login() {
    const user = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch(); // Use AppDispatch for dispatching actions

    let [state, setState] = useState({
        username: "",
        password: ""
    })



    async function handleSubmitLogin(event: any){
        //prevent the default behavior of refreshing the password
        event.preventDefault();
        // will call an axios request that returns the http response 
        try {
            const response = await postLogin();
            console.log(state);
            if(response && response.data) {
              const {message, ...userObject} = response?.data;
              console.log(userObject);
              dispatch(setUserInfo(userObject));
            } else {
              console.log("Response is empty")
            }
          } catch (error) {
              console.log(error);
          }
        
        /* Calls a dispatch that will run the reducer/action we have defined 
          in '../../utility/auth'
         */
   
    }

    //update the state of username with the textbox so that its ready for post
    function usernameChange(event: any){
        setState({...state, username: event.target.value}); 
    }

    function passwordChange(event: any){
        setState({...state, password: event.target.value});
    }


    async function postLogin(){
        try{
            const URL = "http://localhost:3000/login";
            const data = {username: state.username, password: state.password};
            const returnedData = await axios.post(URL, data);
            return returnedData;
        }catch(err){
            console.error(err);
        }
    }

  return (
    <>
        <br/>
        <form onSubmit={handleSubmitLogin}>
            <input type="text" placeholder='username' onChange={usernameChange}></input>
            <br/>
            <input type="text" placeholder='password' onChange={passwordChange}></input>
            <br/>
            <button type="submit">Login</button>
        </form>
        <br/>
    </>
  )
}

export default Login