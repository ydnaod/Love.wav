import React, { useState, useEffect, Fragment, useRef } from 'react';
import './ConversationListContent.css';
import { ConversationPreview } from '../ConversationPreview/ConversationPreview';
import { Conversation } from '../Conversation/Conversation'

export function ConversationListContent({ fetchUserId, conversationList, handleConversationSelect }) {

    const listRef = useRef();

    useEffect(() => {
        return () => {
            const list = listRef.current;
            if (list) {
                list.classList.toggle('fade-out');
            }
        }
    });

    return (
        <Fragment>
            <div className='convo-container-content' ref={listRef}>
                <h1 className="label">messages</h1>
                {
                    conversationList.map(conversation => {
                        return <ConversationPreview conversation={conversation}
                            key={conversation.id}
                            handleConversationSelect={handleConversationSelect} />
                    })
                }
            </div>
        </Fragment>
    )
}