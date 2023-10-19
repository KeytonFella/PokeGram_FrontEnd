import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AuthState } from '../../utility/reduxTypes';
import { AppDispatch } from '../../utility/store';
import { setUserInfo } from '../../utility/auth';
import { useNavigate } from 'react-router';
import { useDisplayError } from '../../Hooks/DisplayError';
import { useShowUserMessage } from '../../Hooks/DisplayAndRedirect';
import "./Login.scss"


function Login() {
  const dispatch: AppDispatch = useDispatch(); // Use AppDispatch for dispatching actions
  const [errorMessage, setErrorMessage] = useDisplayError();
  const [userMessage, setUserMessage] = useShowUserMessage(undefined, "/", 6000);
  
  let [state, setState] = useState({
      username: "",
      password: ""
  })

  async function handleSubmitLogin(event: any){
      //prevent the default behavior of refreshing the password
      event.preventDefault();
      if(!state.username || !state.password) {
        console.log("Missing username or password");
        setErrorMessage("Missing username or password");
        return;
      }
      // will call an axios request that returns the http response 
      const response = await postLogin();
      if(response?.status === 400){
        console.log("response status is ", JSON.stringify(response.status));
        console.log("the response data ",response.data);
        setErrorMessage(response.data || "some error");
        console.log("the response data 2  ",response.data);
        return;
      }
      try {
          if(response && response.data) {
            const {message, ...data} = response?.data;
            console.log(data);
            console.log(data.acessToken);
            const accessToken = data?.accessToken;
            const tokenPayload = accessToken?.payload;
            console.log("my acessToken ", accessToken);
            console.log("token payload:", tokenPayload);
            
            dispatch(setUserInfo({
              user_id: tokenPayload.sub,
              name: tokenPayload?.name || "",
              username: tokenPayload.username,
              token: accessToken.jwtToken
            }));
            setUserMessage({message:"Successful login!",username:tokenPayload.username})
            return;
          } else {
            console.log("Response is empty")
          }
        } catch (error) {
            console.log(error);
        }
      
  
  }

  //update the state of username with the textbox so that its ready for post
  function handleFormInputChange(event: React.ChangeEvent<HTMLInputElement>){
    //takes the inputs name: and takes the value of the event
    const { name, value } = event.target;
    //spreading allows us to edit the properties we want without losing the ones we didnt
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  async function postLogin(){
      const URL = "http://52.90.96.133:5500/api/login";
        const data = {username: state.username, password: state.password};
        try{
          const returnedData = await axios.post(URL, data);
          return returnedData;
        }catch(err){
          const error = err as any;
          //console.error("printting axios error:", err);
          if(error && error.response){
            return error.response; 
          }
          return null;
        } 
      
    }

  return (
      <div id = "container">
        <form onSubmit={handleSubmitLogin}>
              <input type="text" name='username' placeholder='username' onChange={handleFormInputChange}></input>
              <br/>
              <input type="text" name='password' placeholder='password' onChange={handleFormInputChange}></input>
              <br/>
              <button type="submit" disabled={!state.username || !state.password}  >Login</button>
          </form>
          <div className='showMessage'>
            {<p>{errorMessage} </p>}
            {<p>{userMessage?.message}</p>}
            {userMessage?.message && <p>Redirecting {userMessage.username} to the home page</p>}
          </div>
      </div>
  )
}

export default Login