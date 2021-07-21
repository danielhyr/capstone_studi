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
    const [length, setLength] = useState(null)


    useEffect(() => {
        socket.current = io("ws://localhost:8900")

        if (isSession) {
            socket.current.emit("addTimeUser", user.result._id)
            socket.current.on("getTimeUsers", timeusers => {
                setTimeUsers(timeusers)
            })
        }

        else {
            socket.current.emit("disconnectUser", user.result._id)
            socket.current.on("getTimeUsers", timeusers => {
                setTimeUsers(timeusers)
            })
        }
    }, [isSession])

    useEffect(async () => {
        const getusers = async () => {
            try {
                const res = await api.getFollowing(user.result._id)
                const usersId = (timeusers).map(o => o.userId !== user.result._id)

                setLength(String(usersId.length))
            } catch (error) {
                console.log(error)
            }
        }
        getusers()
    }, [timeusers])



    return (
        <section className="ontimer">
                <div className="ontimer__component" >
                     <span className="ontimer__larger">{length}</span> 
                     person(s) are currently in session.
                </div>
        </section>



    )
}

export default StudentsOnline
