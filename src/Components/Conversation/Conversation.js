import React, { useState, Fragment, useEffect, useRef } from 'react';
import './Conversation.css';
import backArrow from '../../images/backArrow.png'
import { Message } from '../Message/Message'
import socketIOClient from "socket.io-client";
const restAPIUrl = require('../../Util/serverUrl');

export function Conversation({ handleConvoToggle, id, fetchUserId, getNameFromId, getPhotoFromId }) {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const socketRef = useRef();
    const conversationRef = useRef();
    const [name, setName] = useState();
    const [photo, setPhoto] = useState();
    const [theirId, setTheirId] = useState();
    const lastMessageRef = useRef();

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleBackClick = () => {
        handleConvoToggle();
    }

    const fetchTheirId = async () => {
        try {
            const myId = await fetchUserId();
            const response = await fetch(`${restAPIUrl.url}/conversations/their-id/${id}/${myId}`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            console.log(parseRes)
            return parseRes;
        } catch (error) {
            console.error(error.message);
        }
    }

    //const SOCKET_SERVER_URL = `${url.url}`;

    const fetchMessages = async () => {
        try {
            const response = await fetch(`${restAPIUrl.url}/conversations/messages/${id}`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            //console.log(parseRes)
            parseRes.forEach(message => {
                message.body = message.message;
                message.userId = message.user_account_id;
            });
            //console.log(parseRes)
            setMessages(parseRes);
            setTimeout(() => {
                executeScroll();
            }, 500)
            //executeScroll()
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(async () => {

        const theirId = await fetchTheirId();
        determineOwner(theirId);
        setTheirId(theirId);
        setName(await getNameFromId(theirId));
        setPhoto(await getPhotoFromId(theirId));
        fetchMessages();
        // Creates a WebSocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            withCredentials: true,
            extraHeaders: {
                "my-custom-header": "abcd"
            },
            query: { id }
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
            setMessages((messages) => [...messages, msg]);
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

    const determineOwner = (id, theirId) => {
        if (id === theirId) {
            //setMessageOwner('my-message');
            return 'their-message'
        }
        else if (id === 999) {
            //setMessageOwner('love.wav-message');
            return 'love.wav-message'
        }
        else {
            //setMessageOwner('their-message');
            return 'my-message'
        }
    }

    const executeScroll = () => {
        // if(lastMessageRef.current){
        // lastMessageRef.current.scrollIntoView();
        // }
        const element = document.getElementById("lastMessageRefDiv");
        element.scrollIntoView();
        // setInterval(() => {
        //     element.scrollIntoView();
        // }, 500)
    }

    return (
        <Fragment>
            <div className='Conversation' ref={conversationRef}>
                <div className='conversationHeader'>
                    <img onClick={handleBackClick} className='backArrow' src={backArrow}></img>
                    <div className='userName'>
                        <img className='conversationIcon' src={photo}></img>
                        <h2>{name}</h2>
                    </div>
                </div>
                <div className="messages">
                    {
                        messages.map((message, index) => {
                            return <Message message={message.body}
                                key={index}
                                owner={message.userId}
                                fetchUserId={fetchUserId}
                                styleName={determineOwner(message.userId, theirId)}/>
                        })
                    }
                    <div id='lastMessageRefDiv' ref={lastMessageRef}></div>
                </div>
                <div className='messageInput'>
                    <form className='messageForm' onSubmit={handleSubmit}>
                        <input value={input} onChange={handleChange} placeholder='message' className='messageInput'></input>
                        <button className='button messageButton'>send</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}