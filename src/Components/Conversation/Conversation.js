import React, { useState, Fragment, useEffect, useRef } from 'react';
import './Conversation.css';
import backArrow from '../../images/backArrow.png'
import {Message} from '../Message/Message'
import socketIOClient from "socket.io-client";

export function Conversation({handleConvoToggle, id, fetchUserId}) {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const socketRef = useRef();
    const conversationRef = useRef();

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleBackClick = () => {
        handleConvoToggle();
    }

    const SOCKET_SERVER_URL = "http://localhost:4000";

    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:4000/conversations/messages/${id}`, {
                method: 'GET',
                headers: { token: sessionStorage.token}
            });
            const parseRes = await response.json();
            //console.log(parseRes)
            parseRes.forEach(message => {
                message.body = message.message;
                message.userId = message.user_account_id;
            });
            //console.log(parseRes)
            setMessages(parseRes);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
    
        fetchMessages();
        // Creates a WebSocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            withCredentials: true,
            extraHeaders: {
              "my-custom-header": "abcd"
            },
            query: {id}
          });
        console.log('socket was created')
        //when you need to pass info back to server (convo id)
        /*const socket = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId },
          });*/
        
        // Listens for incoming messages
        /*
        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
          const incomingMessage = {
            ...message,
            ownedByCurrentUser: message.senderId === socketRef.current.id,
          };
          setMessages((messages) => [...messages, incomingMessage]);
        });*/

        socketRef.current.on('chat message', (msg) => {
            console.log(msg)
            setMessages((messages)=>[...messages, msg]);
        })
        
        // Destroys the socket reference
        // when the connection is closed
        return () => {
          socketRef.current.disconnect();
        };
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = await fetchUserId();
            //setMessages([...messages, input]);
            socketRef.current.emit('chat message', {
                body: input,
                conversationId: id,
                userId: userId
            });
            setInput('');
        } catch (error) {
            console.error(error.message)
        }
    }


    return (
        <Fragment>
            <div className='Conversation' ref={conversationRef}>
                <img onClick={handleBackClick} className='backArrow' src={backArrow}></img>
                <div>
                    {
                        messages.map((message, index) => {
                            return <Message message={message.body}
                                key={index}
                                owner={message.userId}
                                fetchUserId={fetchUserId}/>
                        })
                    }
                </div>
                <div className='messageInput'>
                    <form className='messageForm' onSubmit={handleSubmit}>
                        <input value={input} onChange={handleChange} placeholder='message' className='message'></input>
                        <button className='button messageButton'>send</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}