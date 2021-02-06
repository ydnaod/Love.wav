import React, { useState, useEffect, Fragment, useRef } from 'react';
import './ConversationListContent.css';
import { ConversationPreview } from '../ConversationPreview/ConversationPreview';
import { Conversation } from '../Conversation/Conversation'
import ReactCSSTransitionGroup from 'react-transition-group';

export function ConversationListContent({ fetchUserId, conversationList, handleConversationSelect }) {

    const listRef = useRef();

    const unmount = () => {
        const list = listRef.current;
            if (list) {
                list.classList.toggle('fade-out');
            }
    }

    useEffect(() => {
        return () => {
            unmount();
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