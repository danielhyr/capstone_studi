import { useState, useEffect } from 'react'
import HeroHeader from '../HeroHeader/HeroHeader';
import HeroFooter from '../HeroFooter/HeroFooter';
import { useHistory} from 'react-router-dom'
import './UserList.scss'
import * as api from '../../api/index'
import axios from 'axios';
import { motion } from 'framer-motion'


function UserList() {
    const [users, setUsers] = useState(null)
    const thisuser = JSON.parse(localStorage.getItem('profile'))
    const history = useHistory()

    useEffect(async () => {
        const getusers = async () => {
            try {
                const res = await api.getusers()
                setUsers(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getusers()
    }, [])

    const onFollow = async (e, user) => {
        e.preventDefault()
        const followUser = {
            name: user.name,
            userId: user._id
        }

        try {
            const res = await api.followUser(thisuser.result._id, followUser)
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <>
            <HeroHeader />
            <motion.section className = "allusers"
                  initial={{ opacity: 0 }}
                  animate = {{opacity: 1}}
                  exit = {{opacity: 0}}
            >
                {users?.map(user =>
                (
                    <form className="user" onSubmit={(e) => onFollow(e, user)} onClick={() => { history.push(`/profile/${user._id}`) } }>
                        <div className="userWrapper">
                            <img className="userImage" src="" ></img>
                        </div>
                        <div className="user__username">
                            {user.name}
                        </div>
                        <div>
                            {user.email}
                        </div>
                        <div className="bcontainers">

                        </div>
                    </form>
                ))}
            </motion.section>
            <HeroFooter />
        </>
    )
}

export default UserList
