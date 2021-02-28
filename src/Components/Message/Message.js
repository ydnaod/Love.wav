import React, { useState, Fragment, useEffect, useRef } from 'react';
import './Message.css';

export function Message({ message, owner, fetchUserId, styleName }) {

    //const [messageOwner, setMessageOwner] = useState();
    const messageRef = useRef();
    
    const determineOwner = async () => {
    const userId = await fetchUserId();
    const message = messageRef.current;
    if (owner === userId) {
        //setMessageOwner('my-message');
        message.classList.toggle('my-message')
    }
    else if (owner === 999) {
        //setMessageOwner('love.wav-message');
        message.classList.toggle('lovewav-message')
    }
    else {
        //setMessageOwner('their-message');
        message.classList.toggle('their-message')
    }
}



    useEffect( async() => {
        //determineOwner();
    },[])
    
    return (
        <Fragment>
            <div className="messageContainer">
                <p ref={messageRef} className={`message ${styleName}`}>{message}</p>
            </div>
        </Fragment>
    )
}