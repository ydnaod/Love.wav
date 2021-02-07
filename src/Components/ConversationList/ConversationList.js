import React, { useState, useEffect, Fragment, useRef } from 'react';
import './ConversationList.css';
import { ConversationPreview } from '../ConversationPreview/ConversationPreview';
import { Conversation } from '../Conversation/Conversation'
import { ConversationListContent } from './ConversationListContent';
import { useTransition, animated, useChain, useSpring } from 'react-spring';

export function ConversationList({ fetchUserId }) {

    const [conversationList, setConversationList] = useState([]);
    const [convoToggle, setConvoToggle] = useState(false);
    const [selectedConversation, setSelectedConversation] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const convoListRef = useRef();
    const convoListTransition = useSpring({
        ref: convoListRef,
        to: { opacity: convoToggle ? 0 : 1, transform: convoToggle ? 'translate3d(-100%,0,0)' : 'translate3d(0%,0,0)' },
        from: { opacity: convoToggle ? 1 : 0, transform: convoToggle ? 'translate3d(0%,0,0)' : 'translate3d(-100%,0,0)' },
    });
    const convoRef = useRef();
    const conversationTransition = useSpring({
        ref: convoRef,
        from: { opacity: convoToggle ? 0 : 1, transform: convoToggle ? 'translate3d(-100%,0,0)' : 'translate3d(0%,0,0)' },
        to: { opacity: convoToggle ? 1 : 0, transform: convoToggle ? 'translate3d(0%,0,0)' : 'translate3d(100%,0,0)' },
    });

    useChain(convoToggle ? [convoListRef, convoRef] : [convoRef, convoListRef], [0, 0])


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
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    const handleConvoToggle = () => {
        setConvoToggle(!convoToggle)
    }

    const handleConversationSelect = (id) => {
        //if (closeConvo) {
        setSelectedConversation(id);
        //}
        // else {
        //     setInterval(() => {
        //         setSelectedConversation(id);
        //     }, 1000)
        // }
    }



    const finishedLoadingDiv =
        <Fragment>
            <div className="ConversationList">
                {

                    !convoToggle ? <animated.div style={convoListTransition}><ConversationListContent
                        handleConversationSelect={handleConversationSelect}
                        handleConvoToggle={handleConvoToggle}
                        conversationList={conversationList}
                        fetchUserId={fetchUserId}>
                    </ConversationListContent>
                    </animated.div>
                        :
                        <animated.div style={conversationTransition}>
                                <Conversation id={selectedConversation}
                                    handleConvoToggle={handleConvoToggle}
                                    fetchUserId={fetchUserId}
                                    key={selectedConversation}
                                    getNameFromId={getNameFromId}
                                    getPhotoFromId={getPhotoFromId}/>
                            </animated.div>
                        

                }
            </div>
        </Fragment >;


    return (
        <Fragment>
            {
                isLoading ? <p>loading</p> : finishedLoadingDiv
            }
        </Fragment>
    )
}