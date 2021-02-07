import React, { Fragment } from 'react';
import './LoadingConversationList.css';

export function LoadingConversationList(){
    return(
        <Fragment>
            <div className="ConversationList">
                <h2 className='loading-gradient'>Loading</h2>
                <div className="ConversationPreview">
                <img className="loading-gradient conversationIcon"/>
                <div className="conversationPreviewText">
                    <h2 className='loading-gradient' >Loading</h2>
                    <h5 className="lastText loading-gradient">Loading</h5>
                </div>
            </div>
            <div className="ConversationPreview">
                <img className=" loading-gradient conversationIcon"/>
                <div className="conversationPreviewText">
                    <h2 className='loading-gradient'>Loading</h2>
                    <h5 className="lastText loading-gradient">Loading</h5>
                </div>
            </div>
            </div>
        </Fragment>
    )
}