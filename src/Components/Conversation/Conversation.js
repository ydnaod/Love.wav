import React, { useState, Fragment, useEffect, useRef } from 'react';
import './Conversation.css';
import backArrow from '../../images/backArrow.png'
import {Message} from '../Message/Message'
import socketIOClient from "socket.io-client";

export function Conversation({handleConversationSelect}) {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState();
    const socketRef = useRef();

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleBackClick = () => {
        handleConversationSelect('');
    }

    const SOCKET_SERVER_URL = "http://localhost:4000";

    useEffect(() => {
    
        // Creates a WebSocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            withCredentials: true,
            extraHeaders: {
              "my-custom-header": "abcd"
            }
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
            setMessages((messages)=>[...messages, msg]);
        })
        
        // Destroys the socket reference
        // when the connection is closed
        return () => {
          socketRef.current.disconnect();
        };
      }, []);

      const handleSubmit = (e) => {
        e.preventDefault();
        try {
            //setMessages([...messages, input]);
            socketRef.current.emit('chat message', input);
            setInput('');
        } catch (error) {
            console.error(error.message)
        }
    }


    return (
        <Fragment>
            <div className='Conversation'>
                <img onClick={handleBackClick} className='backArrow' src={backArrow}></img>
                <div>
                    {
                        messages.map((message, index) => {
                            return <Message message={message}
                                key={index}/>
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