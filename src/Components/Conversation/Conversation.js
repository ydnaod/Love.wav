import React, { useState, Fragment } from 'react';
import './Conversation.css';
import backArrow from '../../images/backArrow.png'

export function Conversation({handleConversationSelect}) {

    const handleBackClick = () => {
        handleConversationSelect('');
    }

    return (
        <Fragment>
            <div className='Conversation'>
                <img onClick={handleBackClick} className='backArrow' src={backArrow}></img>
                <div>

                </div>
                <div className='messageInput'>
                    <form className='messageForm'>
                        <input className='message'></input>
                        <button className='button messageButton'>send</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}