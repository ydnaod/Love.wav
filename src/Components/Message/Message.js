import React, {useState, useEffect, Fragment} from 'react';
import './Message.css';

export function Message(props){
    return (
        <Fragment>
            <h1>{props.conversation.name}</h1>
        </Fragment>
    )
}