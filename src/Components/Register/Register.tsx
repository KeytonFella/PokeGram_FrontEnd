import axios from 'axios';
import React, {useState } from 'react'
import { useDisplayError} from '../../Hooks/DisplayError';
import { useShowUserMessage} from '../../Hooks/DisplayAndRedirect';

function Register() {

    let [state, setState] = useState({
        username: "",
        password: "",
        email: ""
    });

    const [userMessage, setUserMessage] = useShowUserMessage(undefined, "/confirm", 6000);
    const [errorMessage, setErrorMessage] = useDisplayError();


    //add error response to page
    async function handleSubmitRegister(event: any){
      //prevent the default behavior of refreshing the password
      event.preventDefault();       
      // Check if username and password are filled
      if(!state.username || !state.password) {
        console.log("Missing username or password");
        setErrorMessage("Missing username or password");
        return;
      }
      // will call an axios request that returns the http response 
      const response = await postRegister();
      //console.log(response);
      if(response?.status === 400){
        console.log("response status is ", JSON.stringify(response.status));
        console.log("the response data ",response.data);
        setErrorMessage(response.data || "some error");
      }
      if(response && response.data) {
        //spread the response body that we can get everything but the 
        //res.message in the data response
        const {message, ...userObject} = response?.data;
        const userData = userObject.user;
        setUserMessage({
          message,
          username: userData?.username
        });

      } else {
        console.log("Response is empty")
      }   
    }

    async function postRegister(){
      const URL = "http://localhost:5500/api/users";
      const data = {username: state.username, password: state.password, email: state.email};
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
    
    function handleFormInputChange(event: React.ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target; //takes the inputs name: and takes the value of the event
        setState(prevState => ({ ...prevState, [name]: value })); //spreading allows us to edit the properties we want without losing the ones we didnt
    }
    return (
    <>
        <br/>
        <form onSubmit={handleSubmitRegister}>
            <input type="text" name="username" placeholder='username' onChange={handleFormInputChange}></input>
            <br/>
            <input type="text" name='password' placeholder='password' onChange={handleFormInputChange}></input>
            <br/>
            <input type="text" name='email' placeholder='email' onChange={handleFormInputChange}></input>
            <br/>
            <button type="submit"  disabled={!state.username || !state.password}>Register</button>
        </form>
        <br/>
        <div className='showMessage'>
          {<p>{errorMessage} </p>}
          {<p>{userMessage?.message} </p>}
          {userMessage.username && <p>Rediricting {userMessage.username} to the Confirmation page</p>}
        </div>
    </>
  )
}

export default Register