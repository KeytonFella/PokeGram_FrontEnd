import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import './Messages.scss'
import MessageModal from '../MessageModal/MessageModal';
const BASE_API = `http://52.90.96.133:5500/api/messages`;

function Messages() {
    const AuthState = useSelector((state: RootState) => state.auth);
    const [sentMessages, setSentMessages] = useState(Array<any>);
    const [receivedMessages, setReceievedMessages] = useState(Array<any>);

    useEffect(() => {
        getMessageList();
    },[sentMessages, receivedMessages],)

    async function getMessageList() {
        axios.get(BASE_API, {headers: {Authorization: 'Bearer ' + AuthState.token}})
        .then(function (response) {
            createMessageObj(response.data.messages)
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
                const senderData = await axios.get(`${BASE_API}/username/${messages[i].sender_id}`, {headers: {Authorization: 'Bearer ' + AuthState.token}})
                const sender_username = senderData.data.username;
                const recipientData = await axios.get(`${BASE_API}/username/${messages[i].recipient_id}`, {headers: {Authorization: 'Bearer ' + AuthState.token}}) 
                const recipient_username = recipientData.data.username;
                
                const messageObj = {
                    message_id: messages[i].message_id,
                    sender: sender_username,
                    sender_id: messages[i].sender_id,
                    recipient: recipient_username,
                    recipient_id: messages[i].recipient_id,
                    message_text: messages[i].message_text
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
        await axios.delete(`${BASE_API}/${event.target.value}`, {headers: {Authorization: 'Bearer ' + AuthState.token}})
        .then(response => response.data.message)
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
                                To: {message.recipient}
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
                                From: {message.sender}
                            </div>
                            <div className="message-text">{message.message_text}</div>
                            <div className="buttons">
                                <MessageModal username={message.sender} buttonText={"Reply"}/>
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