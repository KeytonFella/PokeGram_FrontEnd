import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AuthState } from '../../utility/reduxTypes';
import { AppDispatch } from '../../utility/store';
import { setUserInfo, setToken } from '../../utility/auth';
import { access } from 'fs';


function Login() {
    const user = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch(); // Use AppDispatch for dispatching actions

    let [state, setState] = useState({
        username: "",
        password: ""
    })

    /* user_id: string | null;
    name: string | null;
    session: boolean | null;
    username: string | null;
    token: string | null; 
    {
    "jwtToken": "eyJraWQiOiJYNWRZZ3JBYSs1dTJyejc5VFhiajFwdytpSUtsSmxzQm1WMEs5MTFUamtJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwM2Y3ZmUwYi00ZWU5LTRkMDktYTFkNC02ODIyMzdmMDdmYzQiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl81eGc5SWNxVkoiLCJjbGllbnRfaWQiOiIyOHNmYm1jbTExaGdqb2hkODJzazFkczRpZSIsIm9yaWdpbl9qdGkiOiI3NDRjZjc2YS1hM2Q2LTQ2MWUtODVjYi1kMzhmZGI4ZDgzYzEiLCJldmVudF9pZCI6IjY3ZDFlMTM1LTA3YzctNGRiZS1iYTRmLWFlNzU4MmRkYTVjYiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTczNTQ3OTIsImV4cCI6MTY5NzM1ODM5MiwiaWF0IjoxNjk3MzU0NzkyLCJqdGkiOiIyYjUwN2UwYy0wZGI0LTQwNDktYmU0Zi1jNWZmNTY1YWY4MDgiLCJ1c2VybmFtZSI6InRlc3QifQ.OWjyHjGkEIvCx5VaHKkhM_qqvaj6G2o2FGQVgsG7I0rCIfDoxwa9coH-wqu-9ROFnPIOR31A02BBdi5fzx_ckWHu1E8rj318KozgxbyYD8qnV_2z38ARjGs88Soc6pvmRY1_Y3q84F-iwApT8o8TekwdfLBJerGrWx4FayXfIloUAlzKAkU1Q-zRfBtJfUg0YmB2_ytfzHRubjuUOFzJ4moPWHJXNVvYMRPywyTzPKwBX5xZB0nWCKE04V_VbYLxA0sPCIeQ_Gf930bXzCtOim9En2Kx35knPNU2QAvCw-uBBS0OqJ6MGV55-JbZEZBPmqC6lectRt_DPl_aMVFYuw",
    "payload": {
        "sub": "03f7fe0b-4ee9-4d09-a1d4-682237f07fc4",
        "iss": "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_5xg9IcqVJ",
        "client_id": "28sfbmcm11hgjohd82sk1ds4ie",
        "origin_jti": "744cf76a-a3d6-461e-85cb-d38fdb8d83c1",
        "event_id": "67d1e135-07c7-4dbe-ba4f-ae7582dda5cb",
        "token_use": "access",
        "scope": "aws.cognito.signin.user.admin",
        "auth_time": 1697354792,
        "exp": 1697358392,
        "iat": 1697354792,
        "jti": "2b507e0c-0db4-4049-be4f-c5ff565af808",
        "username": "test"
    }
}
    */

    async function handleSubmitLogin(event: any){
        //prevent the default behavior of refreshing the password
        event.preventDefault();
        // will call an axios request that returns the http response 
        try {
            const response = await postLogin();
            console.log(state);
            if(response && response.data) {
              const {message, ...data} = response?.data;
              const accessToken = data?.accessToken;
              console.log("my acessToken ", accessToken);
              const tokenPayload = accessToken.payload;
              console.log("token payload:", tokenPayload);
              dispatch(setUserInfo({
                user_id: tokenPayload.sub,
                name: tokenPayload?.name ?? "",
                username: tokenPayload.username,
                token: accessToken.jwtToken
              }));
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
            const URL = "http://localhost:5500/api/login";
            const data = {username: state.username, password: state.password, email: "andres192@revature.net"};
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
            <button type="submit" disabled={!state.username || !state.password} >Login</button>
        </form>
        <br/>
    </>
  )
}

export default Login