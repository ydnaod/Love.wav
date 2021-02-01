import React, { useState, Fragment } from 'react';
import './Conversation.css';
import backArrow from '../../images/backArrow.png'
import {Message} from '../Message/Message'

export function Conversation({handleConversationSelect}) {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState();

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleBackClick = () => {
        handleConversationSelect('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            setMessages([...messages, input]);
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