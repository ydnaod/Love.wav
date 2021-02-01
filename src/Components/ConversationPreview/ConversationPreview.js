import React, {useState, useEffect, Fragment} from 'react';
import './ConversationPreview.css';
import redSummer from '../../imagesForDev/92702565_10157230252121762_5471155548982345728_n 1.png'

export function ConversationPreview(props){

    const handleClick = () => {
        props.handleConversationSelect(props.conversation.id);
    }

    return (
        <Fragment>
            <div onClick={handleClick} className="ConversationPreview">
                <img className="conversationIcon" src={props.conversation.picture}/>
                <div className="conversationPreviewText">
                    <h2>{props.conversation.name}</h2>
                    <h5 className="lastText">{props.conversation.lastText}</h5>
                </div>
            </div>
        </Fragment>
    )
}