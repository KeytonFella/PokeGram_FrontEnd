import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import './Messages.scss'
import MessageModal from '../MessageModal/MessageModal';

function Messages() {
    const AuthState = useSelector((state: RootState) => state.auth);
    const [sentMessages, setSentMessages] = useState(Array<any>);
    const [receivedMessages, setReceievedMessages] = useState(Array<any>);
    const USER_ID = AuthState.user_id;
    const BASE_API = `https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/messages`;

    useEffect(() => {
        getMessageList();
    },[],)

    async function getMessageList() {
        axios.get(`${BASE_API}/${USER_ID}`, {headers: {Authorization: AuthState.token}})
        .then(function (response) {
            console.log(response)
            createMessageObj(response.data.body)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    async function createMessageObj(messages: any[]) {
        try{
            let sentMessageArray = [];
            let receivedMessageArray = [];
            for(let i = 0; i < messages.length; i++) {
                const message = messages[i];                
                const messageObj = {
                    message_id: message.message_id,
                    sender_username: message.sender_username,
                    sender_id: message.sender_id,
                    recipient_username: message.recipient_username,
                    recipient_id: message.recipient_id,
                    message_text: message.message_text
                }
                if(AuthState.user_id === messages[i].sender_id){
                    sentMessageArray.push(messageObj);
                }else{
                    receivedMessageArray.push(messageObj);
                }          
            }
            setSentMessages([...sentMessageArray]);
            setReceievedMessages([...receivedMessageArray])
        }catch(err){
            console.log(err);
        }
    }

    async function deleteMessage(event: any) {
        await axios.delete(`${BASE_API}/${USER_ID}/${event.target.value}`, {headers: {Authorization: AuthState.token}})
        .then(response => response.data.body)
        .catch(error => console.log(error));
        getMessageList();
      }
    
  
    return (
        <>
        <div className="messagesContainer">
            <div className="messageList">
            <button className="btn btn-secondary" data-bs-toggle="collapse" data-bs-target="#sentMessages">Sent Messages</button>
                {
                sentMessages.map((message, index) => {
                    return (
                        <div className="message collapse show" key={message.message_id} id="sentMessages">
                            <div className="messageHeader">
                                To: {message.recipient_username}
                            </div>
                            <div className="message-text">{message.message_text}</div>
                            <div className="buttonRight">        
                                <button className="btn btn-secondary" onClick={deleteMessage} value={message.message_id} >Delete Message</button>
                            </div>
                        </div>
                    )
                })
                }
                </div>
                <div className="messageList">
                <button className="btn btn-secondary" data-bs-toggle="collapse" data-bs-target="#incomingMessages">Incoming Messages</button>
                {
                receivedMessages.map((message, index) => {
                    return (
                        <div className="message collapse show" key={message.message_id} id="incomingMessages">
                            <div className="messageHeader">
                                From: {message.sender_username}
                            </div>
                            <div className="message-text">{message.message_text}</div>
                            <div className="buttons" onClick={getMessageList}>
                                <MessageModal username={message.sender_username} buttonText={"Reply"}/>
                                <button className="btn btn-secondary" onClick={deleteMessage} value={message.message_id} >Delete Message</button>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    </>
  )
}

export default Messages