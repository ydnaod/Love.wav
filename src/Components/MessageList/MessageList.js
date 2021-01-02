import React, { useState, useEffect, Fragment } from 'react';
import './MessageList.css';
import {Message} from '../Message/Message'

export function MessageList() {

    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        try {
            const messages = [
                {
                    
                        id: 1,
                        name: 'Red Summer',
                        lastText: 'haha what are you up to?',
                        picture: '/Users/andydo/Documents/CODE/loveWave/lovewave/src/imagesForDev/92702565_10157230252121762_5471155548982345728_n 1.png'
                    
                },
                {
                    
                        id: 2,
                        name: 'Blonde Summer',
                        lastText: 'have you read any Marx?',
                        picture: '/Users/andydo/Documents/CODE/loveWave/lovewave/src/imagesForDev/67135032_10156509996661762_2449079524290199552_o 1.png'
                    
                },
                {
                    
                        id: 3,
                        name: 'Wholesome Summer',
                        lastText: 'i have seasonal allergies',
                        picture: '/Users/andydo/Documents/CODE/loveWave/lovewave/src/imagesForDev/58883111_10156337445321762_6587977256465858560_o 1.png'
                    
                },
                {
                    
                        id: 4,
                        name: 'bikini Summer',
                        lastText: 'u up?',
                        picture: '/Users/andydo/Documents/CODE/loveWave/lovewave/src/imagesForDev/13497952_10153673708421762_3223320782340572090_o 1.png'
                    
                }

            ]
            setMessageList(messages);
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    return (
        <Fragment>
            <div className="MessageList">
                <h1 className="label">Messages</h1>
                {
                    messageList.map(conversation => {
                       return <Message conversation={conversation}
                            key={conversation.id}/>
                    })
                }
            </div>
        </Fragment>
    )
}