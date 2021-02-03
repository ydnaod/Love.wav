import React, { useState, Fragment, useEffect } from 'react';
import './Message.css';

export function Message({ message, owner, fetchUserId }) {

    const [messageOwner, setMessageOwner] = useState();
    
    const determineOwner = async () => {
    const userId = await fetchUserId();
    if (owner === userId) {
        setMessageOwner('my-message');
    }
    else if (owner === 999) {
        setMessageOwner('love.wav-message');
    }
    else {
        setMessageOwner('their-message');
    }
}



    useEffect( async() => {
        determineOwner();
    },[])
    
    return (
        <Fragment>
            <div className="messageContainer">
                <p className={`message ${messageOwner}`}>{message}</p>
            </div>
        </Fragment>
    )
}