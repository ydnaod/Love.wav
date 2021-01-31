import React, { useState, useEffect, Fragment } from 'react';
import './ConversationList.css';
import {Conversation} from '../Conversation/Conversation'

export function ConversationList() {

    const [conversationList, setConversationList] = useState([]);

    useEffect(() => {
        try {
            const conversations = [
                {
                    
                        id: 1,
                        name: 'Red Summer',
                        lastText: 'haha what are you up to?',
                        picture: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/92702565_10157230252121762_5471155548982345728_n.jpg?_nc_cat=100&ccb=2&_nc_sid=09cbfe&_nc_ohc=bYzxoUm1B6QAX8_mV2z&_nc_ht=scontent-lga3-1.xx&oh=25c98447fd86f121d5d634f59c8407e6&oe=60170844'
                    
                },
                {
                    
                        id: 2,
                        name: 'Blonde Summer',
                        lastText: 'have you read any Marx?',
                        picture: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/67135032_10156509996661762_2449079524290199552_o.jpg?_nc_cat=108&ccb=2&_nc_sid=174925&_nc_ohc=PRI_EwjJMKcAX_FfxPi&_nc_ht=scontent-lga3-1.xx&oh=9af4fd4e7f79604c732797e86d93f62c&oe=60170B79'
                    
                },
                {
                    
                        id: 3,
                        name: 'Wholesome Summer',
                        lastText: 'i have seasonal allergies',
                        picture: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/58883111_10156337445321762_6587977256465858560_o.jpg?_nc_cat=102&ccb=2&_nc_sid=174925&_nc_ohc=GLq1vnUf6kwAX_BwUsy&_nc_ht=scontent-lga3-1.xx&oh=0baa28ef8279d2bb9dd1de427227f63d&oe=60162231'
                    
                },
                {
                    
                        id: 4,
                        name: 'bikini Summer',
                        lastText: 'u up?',
                        picture: 'https://scontent-lga3-1.xx.fbcdn.net/v/t31.0-8/13497952_10153673708421762_3223320782340572090_o.jpg?_nc_cat=106&ccb=2&_nc_sid=174925&_nc_ohc=-bwwIT82tz4AX-jOTuc&_nc_ht=scontent-lga3-1.xx&oh=6149c42cfc01ec3f7d669a2b4ca3b015&oe=6016A856'
                    
                }

            ]
            setConversationList(conversations);
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    return (
        <Fragment>
            <div className="ConversationList">
                <h1 className="label">messages</h1>
                {
                    conversationList.map(conversation => {
                       return <Conversation conversation={conversation}
                            key={conversation.id}/>
                    })
                }
            </div>
        </Fragment>
    )
}