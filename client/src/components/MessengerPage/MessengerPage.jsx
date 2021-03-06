import { useEffect, useState, useRef } from 'react'
import { io } from "socket.io-client";
import HeroFooter from '../HeroFooter/HeroFooter';
import HeroHeader from '../HeroHeader/HeroHeader';
import './MessengerPage.scss'
import Conversation from '../MessengerComponents/Conversation/Conversation';
import Message from '../MessengerComponents/Message/Message';
import Online from '../MessengerComponents/Online/Online';
import { motion } from 'framer-motion'

import * as api from '../../api/index'

function MessengerPage() {
    const user = JSON.parse(localStorage.getItem('profile'))

    const [conversations, setConversations] = useState([])

    const [currentChat, setCurrentChat] = useState(null)

    const [messages, setMessages] = useState(null)

    const [newMessage, setNewMessage] = useState("")

    const [arrivalMessage, setArrivalMessage] = useState(null)

    const [onlineUsers, setOnlineUsers] = useState([])
    const [loggedUser, setLoggedUser] = useState()

    const socket = useRef()

    const scrollRef = useRef()

    useEffect(async () => {
        try {
            const res = await api.getSingleUser(user.result._id)
            setLoggedUser(res.data)
        } catch (error) {
            console.log(error)
        }
    }, [])


    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage && currentChat?.member.includes(arrivalMessage?.sender) && setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current.emit("addUser", user.result._id)
        socket.current.on("getUsers", users => {
            setOnlineUsers(users.map(o => o.userId))
        })
    }, [])


    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await api.getConversations(user.result._id)

                setConversations(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getConversations()
    }, [user._id, currentChat])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await api.getMessages(currentChat?._id)
                setMessages(res.data)
            } catch (error) {
            }
        }
        getMessages()
    }, [currentChat])

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const thismessage = {
            sender: user.result._id,
            text: newMessage,
            conversationId: currentChat._id,
            image: loggedUser.image
        }
        const receiverId = currentChat.member.find(member => member !== user.result._id)
        socket.current.emit("sendMessage", {
            senderId: user.result._id,
            receiverId,
            text: newMessage,
        })
        try {
            const res = await api.createMessages(thismessage)
            setMessages([...messages, res.data])
            setNewMessage("");

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <HeroHeader />
            <motion.div className="messenger"
              initial={{ opacity: 0 }}
              animate = {{opacity: 1}}
              exit = {{opacity: 0}}
            >

                <div className="messenger-chatMenu">   
                <h2 className="messenger-chatOnline__header"> Previous Chats</h2>

                   <div className="messenger-chatMenu-wrapper">


                    {conversations.map((c, index) => (
                        <div key={index} onClick={() => setCurrentChat(c)}>
                            <Conversation currentUser={user} conversation={c} />
                        </div>
                    ))}

                </div>
                </div>

                <div className="messenger-chatBox">
                    <div className="messenger-chatBox-wrapper">

                        {currentChat ?
                            <>
                                <div className="messenger-chatBox-Top">

                                    {messages?.map((m, index) =>
                                    (
                                        <div ref={scrollRef} key={index}>
                                            <Message message={m}
                                                own={m.sender === user.result._id}
                                                image={m.image}
                                            />
                                        </div>
                                    ))}

                                </div>
                                <div className="messenger-chatBox-Bottom">
                                    <textarea className="messenger-chatBox-Bottom-message"
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                        placeholder="enter message"></textarea>
                                    <button className="messenger-chatBox-Bottom__button" onClick={handleSubmit}>Send</button>
                                </div>
                            </>
                            : <h1 className="defaulttext">Open an existing conversation or start a new one .</h1>}
                    </div>
                </div>

                <div className="messenger-chatOnline">
                    <h2 className="messenger-chatOnline__header"> Standmates</h2>
                    
                    <Online onlineUsers={onlineUsers}
                        currentId={user.result._id}
                        setCurrentChat={setCurrentChat}
                    />
                </div>
            </motion.div>
            <HeroFooter />
        </>
    )
}

export default MessengerPage
