import React, { useState, useEffect, Fragment, useRef } from 'react';
import './ConversationListContent.css';
import { ConversationPreview } from '../ConversationPreview/ConversationPreview';
import { Conversation } from '../Conversation/Conversation'


export function ConversationListContent({ fetchUserId, conversationList, handleConversationSelect, handleConvoToggle }) {



    useEffect(() => {
        return () => {
            
        }
    });

    return (
        <Fragment>
            <div className='convo-container-content'>
                <h1 className="label">messages</h1>
                {
                    conversationList.map(conversation => {
                        return <ConversationPreview conversation={conversation}
                            key={conversation.id}
                            handleConversationSelect={handleConversationSelect}
                            handleConvoToggle={handleConvoToggle}/>
                    })
                }
            </div>
        </Fragment>
    )
}