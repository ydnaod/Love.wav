import React, { Fragment } from 'react';
import './LoadingConversationList.css';

export function LoadingConversationList(){
    return(
        <Fragment>
            <div className="ConversationList">
                <h2 className='loading-gradient'>Loading</h2>
            </div>
        </Fragment>
    )
}