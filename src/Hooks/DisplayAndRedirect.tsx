import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ShowUserMessage {
  message: string;
  username: string;
}

const DEFAULT_SHOW_MESSAGE: ShowUserMessage = {
  message: "",
  username: ""
};

export function useShowUserMessage(message:ShowUserMessage = DEFAULT_SHOW_MESSAGE, path: string = '/', delay: number = 6000) {
  const [showUserMessage, setUserMessage] = useState<ShowUserMessage>(message);
  const navigate = useNavigate();

  //display a message of registered users username and navigates to confirm/login
  useEffect(() => {
    if (showUserMessage.message && showUserMessage.username) {
      // Hide the  message after 5 seconds and redirect user
      const timer = setTimeout(() => {
        console.log("in timeout");
        setUserMessage(DEFAULT_SHOW_MESSAGE);
        navigate(path); // Redirect to login page
      }, delay);
      // Cleanup function to clear the timer
      return () => clearTimeout(timer);
    }
  }, [showUserMessage.message, navigate]);  // Dependency on username and navigate so it cleans up 

  return [showUserMessage,setUserMessage] as const;
}
