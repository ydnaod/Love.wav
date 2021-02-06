import React, { useState, useEffect, Fragment, useRef } from 'react';
import './ConversationList.css';
import { ConversationPreview } from '../ConversationPreview/ConversationPreview';
import { Conversation } from '../Conversation/Conversation'
import { ConversationListContent } from './ConversationListContent';
import { CSSTransitionGroup } from 'react-transition-group';

export function ConversationList({ fetchUserId }) {

    const [conversationList, setConversationList] = useState([]);
    const [conversationIdList, setConversationIdList] = useState();
    const [selectedConversation, setSelectedConversation] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const listRef = useRef();
    const convoRef = useRef();

    const fetchLastMessage = async (id) => {
        const response = await fetch(`http://localhost:4000/conversations/last-message/${id}`, {
            method: 'GET',
            headers: { token: sessionStorage.token }
        });
        //console.log(response)
        const parseRes = await response.json();
        //console.log(parseRes)
        return parseRes;
    }

    const createConvoPreview = async (conversation) => {
        const myId = await fetchUserId();
        let nameToFetch;
        let photoToFetch;
        if (conversation.user_account_id === myId) {
            nameToFetch = await getNameFromId(conversation.other_user_account_id);
            photoToFetch = await getPhotoFromId(conversation.other_user_account_id);
        }
        else {
            nameToFetch = await getNameFromId(conversation.user_account_id);
            photoToFetch = await getPhotoFromId(conversation.user_account_id);
        }
        const lastMessage = await fetchLastMessage(conversation.id);
        //console.log( lastMessage);
        //console.log(nameToFetch);
        //console.log(photoToFetch)
        return {
            id: conversation.id,
            name: nameToFetch,
            lastText: lastMessage.message,
            picture: photoToFetch
        };
    }

    const fetchConversations = async () => {
        try {
            const myId = await fetchUserId();
            const response = await fetch('http://localhost:4000/conversations/', {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            let hasMatches;
            console.log(parseRes)
            if (parseRes.length == 0) {
                hasMatches = false;
            }
            else {
                hasMatches = true;
            }
            const tempConvos = [];
            await parseRes.forEach(async (conversation) => {
                const object = await createConvoPreview(conversation);
                //console.log(object)
                tempConvos.push(object);
            });
            console.log(tempConvos);
            setConversationList(tempConvos);
            // if(conversationList.length == 0 && hasMatches){
            //     setConversationList(tempConvos);
            // }
            // else{
            //     setIsLoading(false);
            // }
            //setIsLoading(false)
            setInterval(() => {
                setIsLoading(false)
            }, 1500)
        } catch (error) {
            console.error(error.message);
        }
    }

    const getNameFromId = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/profile/${id}/name`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            //console.log(parseRes);
            return parseRes;
        } catch (error) {
            console.error(error.message);
        }
    }

    const getPhotoFromId = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/profile/${id}/photo`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            //console.log(parseRes);
            return parseRes;
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchConversations();
        try {
            // const conversations = [
            //    
            //         
            //     {

            //         id: 4,
            //         name: 'bikini Summer',
            //         lastText: 'u up?',
            //         picture: 'https://scontent-iad3-1.xx.fbcdn.net/v/t31.0-8/13497952_10153673708421762_3223320782340572090_o.jpg?_nc_cat=106&ccb=2&_nc_sid=174925&_nc_ohc=j_Zwan_QIAkAX-_cPAN&_nc_ht=scontent-iad3-1.xx&oh=4769a5cec2a20c626432248dee7e7c4f&oe=603E3556'

            //     }

            // ]
            //fetchConversations();
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    const handleConversationSelect = (id, closeConvo = false) => {
        const list = listRef.current;
        console.log(closeConvo)
        if (list && !closeConvo) {
            list.classList.toggle('fade-out');
        }
        //if (closeConvo) {
        setSelectedConversation(id);
        //}
        // else {
        //     setInterval(() => {
        //         setSelectedConversation(id);
        //     }, 1000)
        // }
    }

    // const conversationListDiv =
    //     <Fragment>
    //         <div className='convo-container-content' ref={listRef}>
    //             <h1 className="label">messages</h1>
    //             {
    //                 conversationList.map(conversation => {
    //                     return <ConversationPreview conversation={conversation}
    //                         key={conversation.id}
    //                         handleConversationSelect={handleConversationSelect} />
    //                 })
    //             }
    //         </div>
    //     </Fragment>;

    const finishedLoadingDiv =
        <Fragment>
            <div className="ConversationList">
                {
                    selectedConversation ?
                        <CSSTransitionGroup
                            transitionName="conversation-animation"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}>
                            <Conversation id={selectedConversation}
                                handleConversationSelect={handleConversationSelect}
                                fetchUserId={fetchUserId} 
                                key={selectedConversation}/>
                        </CSSTransitionGroup> : <ConversationListContent
                            handleConversationSelect={handleConversationSelect}
                            conversationList={conversationList}
                            fetchUserId={fetchUserId} />
                }
            </div>
        </Fragment>;

    return (
        <Fragment>
            {
                isLoading ? <p>loading</p> : finishedLoadingDiv
            }
        </Fragment>
    )
}