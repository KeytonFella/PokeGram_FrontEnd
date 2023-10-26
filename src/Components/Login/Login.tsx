import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AuthState } from '../../utility/reduxTypes';
import { AppDispatch } from '../../utility/store';
import { setUserInfo } from '../../utility/auth';
import { useNavigate } from 'react-router';
import { useDisplayError } from '../../Hooks/DisplayError';
import { useShowUserMessage } from '../../Hooks/DisplayAndRedirect';
import { Link } from 'react-router-dom';
import "./Login.scss"


function Login() {
  const dispatch: AppDispatch = useDispatch(); // Use AppDispatch for dispatching actions
  const [errorMessage, setErrorMessage] = useDisplayError();
  const [userMessage, setUserMessage] = useShowUserMessage(undefined, "/", 6000);
  const URL = "http://52.90.96.133:5500/api/login"
  /* const URL = "http://localhost:5500/api/login"; */
  
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
        console.log("response status is ", response.status);
        console.log("the response data ",response.data);
        setErrorMessage(response.data.message || "some error");
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
        <div className="loginContainer">
          <img className="logo" src={require("../../images/pgLogo.png")} alt="pokegram logo" />
        <div className="loginHeader"> Welcome! </div>
        <div className="loginSubtext">Sign in to your account</div>     
          <form className="loginForm" onSubmit={handleSubmitLogin}>
                <div className="loginSubtext">Username</div>
                <input className="loginInput" type="text" name='username' placeholder='' onChange={handleFormInputChange}></input>
                <br/>
                <div className="loginSubtext">Password</div>
                <input className="loginInput" type="password" name='password' placeholder='' onChange={handleFormInputChange}></input>
                <br/>
                <button className="loginButton" type="submit" disabled={!state.username || !state.password}  >Login</button>
            </form>
            <div className='showMessage'>
              {<p>{errorMessage} </p>}
              {<p>{userMessage?.message}</p>}
              {userMessage?.message && <p>Redirecting {userMessage.username} to the home page</p>}
            </div>
            <Link className="loginSubtext" to="/register">New user? Register here!</Link>
            <div className="space"> </div>
        </div>
      </div>
  )
}

export default Login