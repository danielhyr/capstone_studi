import { useEffect, useState, useRef } from 'react';
import { io } from "socket.io-client";
import axios from 'axios';
import * as api from '../../../api/index'
import './StudentsOnline.scss'

function StudentsOnline({ isSession }) {
    const socket = useRef()
    const user = JSON.parse(localStorage.getItem('profile'))
    const [users, setUsers] = useState(null)
    const [timeusers, setTimeUsers] = useState(null)


    useEffect(() => {
        socket.current = io("ws://localhost:8900")

        if (isSession) {
            socket.current.emit("addTimeUser", user.result._id)
            socket.current.on("getTimeUsers", timeusers => {
                console.log(timeusers)
                setTimeUsers(timeusers)
            })
        } 
        
        else {
            socket.current.emit("disconnectUser", user.result._id)
            socket.current.on("getTimeUsers", timeusers => {
                setTimeUsers(timeusers)
            })
        }
        // socket.current = io("ws://localhost:8900")
        // socket.current.emit("addTimeUser", user.result._id)
        // console.log("sutendstonline")
        // socket.current.on("getTimeUsers", timeusers => {
        //     setTimeUsers(timeusers)
        // })
    }, [isSession])

    useEffect(async () => {
        const getusers = async () => {
            try {
                const res = await api.getFollowing(user.result._id)
                const usersId = (timeusers).map(o => o.userId)
                console.log(res.data)
                console.log(usersId)
                const thisData = res.data.filter((student) => usersId.forEach(id  => id === student.userId) )
                console.log(thisData)

                setUsers(thisData)

            } catch (error) {
                console.log(error)
            }
        }
        getusers()
    }, [timeusers])

    if (users === null) {
        return (
            null
        )
    }

    return (
        <section className="ontimer">
            {users?.map(user => (
                <div className="ontimer__component" >
                    {user.name} is also on the grind.
                </div>
            ))}
        </section>



    )
}

export default StudentsOnline
