import { useEffect, useState, useRef} from 'react'
import HeroFooter from '../HeroFooter/HeroFooter';
import HeroHeader from '../HeroHeader/HeroHeader';
import './MessengerPage.scss'
import Conversation from '../MessengerComponents/Conversation/Conversation';
import Message from '../MessengerComponents/Message/Message';
import Online from '../MessengerComponents/Online/Online';
import { getConversations} from '../../actions/conversations'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import {io} from "socket.io-client";

function MessengerPage() {
    const user = JSON.parse(localStorage.getItem('profile'))

    const [conversations, setConversations] = useState([])

    const [currentChat, setCurrentChat] = useState(null)

    const [messages, setMessages] = useState(null)

    const [newMessage, setNewMessage] = useState("")

    const scrollRef = useRef()

    const dispatch = useDispatch()

    useEffect(() => {

        const getConversations = async () => {
        try {
            console.log("change")
            const res = await axios.get("/conversations/" + user.result._id)

            setConversations(res.data)
            console.log(res)
         } catch (error) {
            
        }
    }
    getConversations()
    },[user._id])

    useEffect(() => {
        console.log("hello")
        const getMessages = async () => {
            try {
                const res = await axios.get("/messages/" + currentChat._id)
                setMessages(res.data)
                console.log("updated")
                console.log(res)
            } catch (error) {
                console.log(error)
            }
       
        }
        getMessages()
    }, [currentChat])
    
    useEffect(() => {
        scrollRef?.current?.scrollIntoView({behavior: "smooth"})

    }, [messages])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const thismessage = {
            sender: user.result._id,
            text: newMessage,
            conversationId : currentChat._id
        }
        try {
            const res = await axios.post("/messages", thismessage);
            console.log(res.data)
            console.log(thismessage)
            setMessages([...messages, res.data])
            setNewMessage("");

        } catch (error) {
            console.log(error)
        }
    }


    console.log(user)
    console.log(conversations)
    return (
        <>
            <HeroHeader />
            <div className="messenger">

                <div className="messenger-chatMenu">      <div className="messenger-chatMenu-wrapper">
                    <input placeholder="Search for friends" className="messenger-chatMenu__input" />
 
                    {conversations.map((c) => (
                        <div onClick = {() => setCurrentChat(c)}>
                         <Conversation currentUser = {user} conversation = {c}/>
                        </div>
                            ))}

                </div>
                </div>

                <div className="messenger-chatBox">
                    <div className="messenger-chatBox-wrapper">

                        {currentChat ? 
                        <>
                            <div className = "messenger-chatBox-Top">

                            {messages?.map(m => 
                            (    
                                <div ref = {scrollRef}>
                                    <Message message = {m}
                            own = {m.sender === user.result._id}/>
                           </div>
                            ))}
                  
                        </div>    
                        </>
                   : <span>Open a conversation to start a chat</span> }
                
                        <div className = "messenger-chatBox-Bottom">
                            <textarea className = "messenger-chatBox-Bottom-message" 
                           onChange = {(e) => setNewMessage(e.target.value)}
                           value={newMessage} 
                            placeholder="enter message"></textarea>
                            <button className = "messenger-chatBox-Bottom__button" onClick = {handleSubmit}>Send</button>
                        </div>
                    </div></div>

                <div className="messenger-chatOnline">

                    <div className="messenger-chatOnline-wrapper"> online
                    </div>
                    <Online/>
                    </div>
            </div>
            <HeroFooter />
        </>
    )
}

export default MessengerPage
