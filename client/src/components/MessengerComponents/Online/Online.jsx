import { useState, useEffect } from 'react'
import './Online.scss'
import * as api from '../../../api/index'

function Online({ onlineUsers, currentId, setCurrentChat }) {

    const [following, setFollowing] = useState([])
    const [onlineFollowing, setOnlineFollowing] = useState([])
    const [offlineFollowing, setOfflineFollowing] = useState([])
    const currentuser = JSON.parse(localStorage.getItem('profile'))
    useEffect(() => {
        const getFollowing = async () => {
            const res = await api.getFollowing(currentuser.result._id)
            setFollowing(res.data)
        }
        getFollowing()
    }, [])


    useEffect(async () => {
        console.log(following)
       await setOnlineFollowing(following.filter((f) => onlineUsers.includes(f.userId) && f.userId !== currentId))
       console.log("this", following.filter((f) => onlineUsers.includes(f.userId) && f.userId !== currentId).length)
    }, [following, onlineUsers])

    useEffect(async () => {
        console.log(following)
        console.log(onlineFollowing)
        if (onlineFollowing.length === 0) {
            console.log(following)
            setOfflineFollowing(following)
            console.log(offlineFollowing)
        } else {
            const newArr = await onlineFollowing.map(f => f.userId)
            console.log(newArr)
            const offlineFollowing = following.filter(f => newArr.find(val => f.userId !== val))
            setOfflineFollowing(offlineFollowing)        }
    }, [following, onlineFollowing])


    const handleClick = async (user) => {
        try {
            const res = await api.findConversation(currentId, user.userId)
            setCurrentChat(res.data)
            if (res.data === null) {

                const newConvo = {
                    senderId: currentId,
                    receiverId: user.userId
                }
                const res = await api.createConversation(newConvo)
                setCurrentChat(res.data)
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="online" >
            {onlineFollowing.map((o) => (

                <div className="online-Friend" onClick={() => handleClick(o)}>
                    <div className="online-ImgContainer">
                        <img
                            className="online-Img"
                            src=""
                            alt=""
                        />
                        <div className="online-Badge"></div>
                    </div>
                    <span className="online-Name">{o.name}</span>
                    <span className="online-Name">{o._id}</span>

                </div>
            ))}
            {offlineFollowing.map((o) => (

                <div className="offline-Friend" onClick={() => handleClick(o)}>
                    <div className="offline-ImgContainer">
                        <img
                            className="offline-Img"
                            src=""
                            alt=""
                        />
                        <div className="offline-Badge"></div>
                    </div>
                    <span className="offline-Name">{o.name}</span>
                    <span className="offline-Name">{o._id}</span>

                </div>
            ))}
        </div>
    )
}

export default Online
