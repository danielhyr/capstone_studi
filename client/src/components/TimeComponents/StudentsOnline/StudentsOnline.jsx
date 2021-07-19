import { useEffect, useState, useRef } from 'react';
import { io } from "socket.io-client";
import axios from 'axios';

function StudentsOnline() {
    const socket = useRef()
    const user = JSON.parse(localStorage.getItem('profile'))
    const [users, setUsers] = useState(null)
    const [timeusers, setTimeUsers] = useState(null)


    console.log("hello")
    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.emit("addTimeUser", user.result._id)
        console.log("sutendstonline")
        socket.current.on("getTimeUsers", timeusers => {
            setTimeUsers(timeusers)
        })
    }, [])

    useEffect(async () => {
        const getusers = async () => {
            try {
                const res = await axios.get("/users")
                const usersId = (timeusers).map(o => o.userId)

                // Everyone who is online
                const thisData = res.data.filter((student) => usersId.includes(student._id))

                // const thisData = res.data.filter((student) => usersId.includes(student._id)&&student._id !== user.result._id)

                console.log(thisData)
                setUsers(thisData)

            } catch (error) {
                console.log(error)
            }
        }
        getusers()
    }, [timeusers])

    if(users === null) {
        return (
            null
        )
    }

    return (
        users?.map(user => (
            <div>
          {user.name} is also on the grind.
        </div>
        ))
    ) 
}

export default StudentsOnline
