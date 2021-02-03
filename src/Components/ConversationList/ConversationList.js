import React, { useState, useEffect, Fragment } from 'react';
import './ConversationList.css';
import { ConversationPreview } from '../ConversationPreview/ConversationPreview';
import {Conversation} from '../Conversation/Conversation'

export function ConversationList({fetchUserId}) {

    const [conversationList, setConversationList] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState();

    useEffect(() => {
        try {
            const conversations = [
                {

                    id: 1,
                    name: 'Red Summer',
                    lastText: 'haha what are you up to?',
                    picture: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/92702565_10157230252121762_5471155548982345728_n.jpg?_nc_cat=100&ccb=2&_nc_sid=09cbfe&_nc_ohc=WtYksnctH3IAX-kVadz&_nc_ht=scontent-iad3-1.xx&oh=8457b4f429152c78675a801954d646e4&oe=603E9544'

                },
                {

                    id: 2,
                    name: 'Blonde Summer',
                    lastText: 'have you read any Marx?',
                    picture: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/67135032_10156509996661762_2449079524290199552_o.jpg?_nc_cat=108&ccb=2&_nc_sid=174925&_nc_ohc=fBp8S8ZPj4MAX9HI70O&_nc_ht=scontent-iad3-1.xx&oh=1db0ab230c523cf7ad595f2480de61ac&oe=603E9879'

                },
                {

                    id: 3,
                    name: 'Wholesome Summer',
                    lastText: 'i have seasonal allergies',
                    picture: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/58883111_10156337445321762_6587977256465858560_o.jpg?_nc_cat=102&ccb=2&_nc_sid=174925&_nc_ohc=3_yJF2Q2AB0AX9Q1j4U&_nc_ht=scontent-iad3-1.xx&oh=4230bbca7bfb9077fd01043caaa60e30&oe=603DAF31'

                },
                {

                    id: 4,
                    name: 'bikini Summer',
                    lastText: 'u up?',
                    picture: 'https://scontent-iad3-1.xx.fbcdn.net/v/t31.0-8/13497952_10153673708421762_3223320782340572090_o.jpg?_nc_cat=106&ccb=2&_nc_sid=174925&_nc_ohc=j_Zwan_QIAkAX-_cPAN&_nc_ht=scontent-iad3-1.xx&oh=4769a5cec2a20c626432248dee7e7c4f&oe=603E3556'

                }

            ]
            setConversationList(conversations);
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    const handleConversationSelect = (id) => {
        setSelectedConversation(id);
    }

    const conversationListDiv =
        <Fragment>
            <h1 className="label">messages</h1>
            {
                conversationList.map(conversation => {
                    return <ConversationPreview conversation={conversation}
                        key={conversation.id}
                        handleConversationSelect={handleConversationSelect}/>
                })
            }
        </Fragment>;

    return (
        <Fragment>
            <div className="ConversationList">
                {selectedConversation ? <Conversation id={selectedConversation}
                    handleConversationSelect={handleConversationSelect}
                    fetchUserId={fetchUserId}/> : conversationListDiv}
            </div>
        </Fragment>
    )
}