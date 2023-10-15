import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RootState } from '../../utility/reduxTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../utility/store';
import { setUserInfo, setToken } from '../../utility/auth';
import  { useNavigate } from 'react-router-dom';

function Confirm() {
    //const user = useSelector((state: RootState) => state.auth); //for accessing global store
   // const dispatch: AppDispatch = useDispatch(); // Use AppDispatch for dispatching actions/reducers
    const DEFAULT_SHOW_MESSAGE = {
      message: "",
      res_username: ""
    };

    let [state, setState] = useState({
        username: "",
        confirmationCode: ""
    })
    const [showMessage, setShowMessage] = useState(DEFAULT_SHOW_MESSAGE);
    const navigate = useNavigate();

    //add error response to page
    async function handleSubmitConfirm(event: any){
        //prevent the default behavior of refreshing the confirmationCode
        event.preventDefault();       
        // Check if username and confirmationCode are filled
        if(!state.username || !state.confirmationCode) {
          console.log("Missing username or confirmationCode");
          return;
        }
        // will call an axios request that returns the http response 
          const response = await postConfirm();
          //console.log(response);
          if(response?.status === 400){
            console.log("response is 400");
            console.log(response.data);
            setShowMessage({
              ...showMessage, //allows "saving" the attributes we dont change
              message: "the message" //only change the message
            });
            console.log(showMessage.message);
          }
          if(response && response.data) {
            //spread the response body that we can get everything but the 
            //res.message in the data response
            const {message, ...userObject} = response?.data;
            const userData = userObject.user;
            setShowMessage({
              message,
              res_username: userData?.username
            });
            //console.log(message);
          } else {
            console.log("Response is empty");
          }
        
        
    }

    //display a message of registered users username and navigates to confirm/login
    useEffect(() => {
        if (showMessage.message || showMessage.res_username) {
          // Hide the  message after 5 seconds and redirect user
          const timer = setTimeout(() => {
            console.log("in timeout");
            setShowMessage(DEFAULT_SHOW_MESSAGE);
            navigate('/login'); // Redirect to login page
          }, 6000);
    
          // Cleanup function to clear the timer
          return () => clearTimeout(timer);
        }

      }, [showMessage.message, navigate]);  // Dependency on username and navigate so it cleans up 


    function handleFormInputChange(event: React.ChangeEvent<HTMLInputElement>){
        //takes the inputs name: and takes the value of the event
        const { name, value } = event.target;
        //spreading allows us to edit the properties we want without losing the ones we didnt
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    async function postConfirm(){
      const URL = "http://localhost:5500/api/confirm";
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
            <button type="submit"  disabled={!state.username }>Confirm</button>
        </form>
        <br/>
        <div className='showMessage'>
          {<p>{showMessage?.message} </p>}
          {showMessage.res_username && <p>Rediricting {showMessage.res_username} to the login page</p>}
        </div>
    </>
  )
}

export default Confirm