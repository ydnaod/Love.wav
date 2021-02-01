import React,{useState, Fragment} from 'react';
import './Message.css';

export function Message({message}){
    return(
        <Fragment>
            <div className='message'>
                <p>{message}</p>
            </div>
        </Fragment>
    )
}