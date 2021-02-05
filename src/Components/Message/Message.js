import React, { useState, Fragment, useEffect, useRef } from 'react';
import './Message.css';

export function Message({ message, owner, fetchUserId }) {

    const messageRef = useRef();
    
    const determineOwner = async () => {
    const userId = await fetchUserId();
    const message = messageRef.current;
    if (owner === userId) {
        message.classList.toggle('my-message')
    }
    else if (owner === 999) {
        message.classList.toggle('love.wav-message')
    }
    else {
        message.classList.toggle('their-message')
    }
}



    useEffect( async() => {
        determineOwner();
    },[])
    
    return (
        <Fragment>
            <div className="messageContainer">
                <p ref={messageRef} className={`message`}>{message}</p>
            </div>
        </Fragment>
    )
}