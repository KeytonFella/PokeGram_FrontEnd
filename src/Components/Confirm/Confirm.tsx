import axios from 'axios';
import React, {useState } from 'react'
import { useDisplayError } from '../../Hooks/DisplayError';
import { useShowUserMessage} from '../../Hooks/DisplayAndRedirect';

function Confirm() {
    let [state, setState] = useState({
        username: "",
        confirmationCode: ""
    });

    const [errorMessage, setErrorMessage] = useDisplayError();
    const [userMessage, setUserMessage] = useShowUserMessage(undefined, "/login", 6000);
 
    //add error response to page
    async function handleSubmitConfirm(event: any){
      //prevent the default behavior of refreshing the confirmationCode
      event.preventDefault();       
      // Check if username and confirmationCode are filled
      if(!state.username || !state.confirmationCode) {
        console.log("Missing username or confirmationCode");
        setErrorMessage("Missing username or confirmation code");
        return;
      }
      // will call an axios request that returns the http response 
      const response = await postConfirm();
      if(response?.status === 400){
        setErrorMessage(response.data);
        return;
      }
      if(response && response.data) {
        const message = response?.data?.message;
        setUserMessage({message, username: state.username});
        return;
      }else {
        console.log("Response is empty");
      }
    }


    function handleFormInputChange(event: React.ChangeEvent<HTMLInputElement>){
        //takes the inputs name: and takes the value of the event
        const { name, value } = event.target;
        //spreading allows us to edit the properties we want without losing the ones we didnt
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    async function postConfirm(){
      const URL = "http://52.90.96.133:5500:5500/api/confirm";
      const data = {username: state.username, confirmationCode: state.confirmationCode};
      try{
        const returnedData = await axios.post(URL, data);
        return returnedData;
      }catch(err){
        const error = err as any;
        console.error("printting axios error:", err);
        if(error && error.response){
           return error.response; 
        }
        return null;
      }
     
        
    }

  return (
    <>
        <br/>
        <form onSubmit={handleSubmitConfirm}>
            <input type="text" name="username" placeholder='username' onChange={handleFormInputChange}></input>
            <br/>
            <input type="text" name='confirmationCode' placeholder='confirmation-code' onChange={handleFormInputChange}></input>
            <br/>
            <button type="submit"  disabled={!state.username || !state.confirmationCode }>Confirm</button>
        </form>
        <br/>
        <div className='showMessage'>
          {<p>{errorMessage} </p>}
          {<p>{userMessage?.message} </p>}
          {userMessage?.message && <p>Rediricting {state.username} to the login page</p>}
        </div>
    </>
  )
}

export default Confirm