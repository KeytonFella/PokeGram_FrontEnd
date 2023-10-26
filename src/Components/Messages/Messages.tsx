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
    const USER_ID = "21a4fe80-ce1d-42d0-8718-22e580940267"; //AuthState.user_id;
    const BASE_API = `https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/messages`;
    const token = "eyJraWQiOiJrNmxNRFZrMFpkaWU0RzVaRjNreThhMDgzeDlheEVKbnNRcUhOaFBOZFVBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyMWE0ZmU4MC1jZTFkLTQyZDAtODcxOC0yMmU1ODA5NDAyNjciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX1hKTEZiZWxkRCIsImNvZ25pdG86dXNlcm5hbWUiOiJrZXl0b24iLCJvcmlnaW5fanRpIjoiYzdhMjdhMTctMDYzYi00OWYxLTg3OWItMWFkNjU2ZmQ0ODIzIiwiYXVkIjoiNTh0cmIydTAzbnJmb251anU3Z2Fzc3ZlZTciLCJldmVudF9pZCI6IjA4NzA5ODM4LWJmNjMtNDBhNi05NWQzLWUxZjE3MGE5ZjgxMiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjk4MzM2MzQyLCJleHAiOjE2OTgzMzk5NDIsImlhdCI6MTY5ODMzNjM0MiwianRpIjoiNGNkZGY3MzAtMmI1OC00ODFjLTgyZWQtMTI5Mzk0NDBiZGU3IiwiZW1haWwiOiJrZXl0b25mcmlza2VAZ21haWwuY29tIn0.uEFhsx5abcqGiIaCbp_ug2bziLcr9MU5k26PecPGV31T_hINYeFKvKzH3-D27JywDVFU3O2Xnf95eVEvtYjoXUMne8SiEiHYO3yo8RuDfwr9m_RDldx8ayRQZZiCWa2L24bVwhKmOg9hCxye12nK1NvKK3KZ_vGt1NUqCsSOawiWKRLUUhrIvuGyorK8810A2MMKk3KiZnmlC1w094oIJscWPO-KxcUi-1wRfbVO__1OvzGUch39lTQ1auphZJXgk0bzRJx0Ujvtey2jMo-rLeLjQ4nK6af9x1iMUl3qDcBHZXHL1z8SckFfnyjrh-0u0lN4bh9JTr942X0FvvIHNQ"

    useEffect(() => {
        getMessageList();
    },[],)

    async function getMessageList() {
        axios.get(`${BASE_API}/${USER_ID}`, {headers: {Authorization: token}})
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

                // const sender_username = senderData.data.username;

                // const recipient_username = recipientData.data.username;
                
                const messageObj = {
                    message_id: messages[i].message_id,
                    // sender: sender_username,
                    sender_id: messages[i].sender_id,
                    // recipient: recipient_username,
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
                                To: {message.recipient_id}
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
                                From: {message.sender_id}
                            </div>
                            <div className="message-text">{message.message_text}</div>
                            <div className="buttons" onClick={getMessageList}>
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