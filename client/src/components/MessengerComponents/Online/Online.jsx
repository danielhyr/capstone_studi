import axios from 'axios'
import { useState, useEffect } from 'react'
import './Online.scss'

function Online({ onlineUsers, currentId, setCurrentChat }) {

    const [following, setFollowing] = useState([])
    const [onlineFollowing, setOnlineFollowing] = useState([])
    const [offlineFollowing, setOfflineFollowing] = useState([])

    useEffect(() => {
        const getFollowing = async () => {
            const res = await axios.get(`/users/following/${currentId}`)
            setFollowing(res.data)
        }
        getFollowing()
    }, [])


    useEffect(() => {
        console.log(onlineUsers)
        console.log(following)
        setOnlineFollowing(following.filter((f) => onlineUsers.includes(f.userId) && f.userId !== currentId))
  
   

        console.log(following)
    }, [following, onlineUsers])

    useEffect(async () => {
       const newArr = await onlineFollowing.map(f => f.userId)
       console.log(newArr)
       const offlineFollowing = following.filter(f => newArr.find(val => f.userId !== val) )
       setOfflineFollowing(offlineFollowing)
    }, [onlineFollowing])


    const handleClick = async (user) => {
        console.log(user)
        try {
            const res = await axios.get(`/conversations/find/${currentId}/${user.userId}`)
            console.log(res)
            setCurrentChat(res.data)
            if (res.data === null) {

                const newConvo = {
                    senderId:currentId,
                    receiverId: user.userId
                }
                const res = await axios.post(`/conversations/`, newConvo)
                setCurrentChat(res.data)


            }

        } catch (error) {
            console.log(error)
        }
    }


    console.log(following)
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
