import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import './MessageModal.scss';

const BASE_API = `http://52.90.96.133:5500/api/messages`;

function MessageModal(props: any) {
    const username = props.username;
    const buttonText = props.buttonText;
    const [recipient, setRecipient] = useState(username)
    const [message, setMessage] = useState("")
    const AuthState = useSelector((state: RootState) => state.auth);

    const handleRecipientChange = (event: any) => {
        setRecipient(event.target.value);
    }

    const handleMessageChange = (event: any) => {
        setMessage(event.target.value);
    }

    async function sendMessage(event: any){
        event.preventDefault();
        
        axios.put(BASE_API, {recipient_id: recipient, message_text: message}, {headers: {Authorization: 'Bearer ' + AuthState.token}})
        .then(response => alert('Message sent!'))
        .catch(err => console.log(err))
    }


  return (
    <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever={username ? username: "user_id"}>{buttonText ? buttonText : "Send Message"}</button>
       
        <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">New message</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label" >Recipient:</label>
                    <input type="text" className="form-control" id="recipient-name" value={recipient} onChange={handleRecipientChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor={"message-text"} className="col-form-label">Message:</label>
                    <textarea className="form-control" id="message-text" value={message} onChange={handleMessageChange}></textarea>
                </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={sendMessage}>Send message</button>
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default MessageModal