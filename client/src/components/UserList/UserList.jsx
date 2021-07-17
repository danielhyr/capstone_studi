import { useState, useEffect } from 'react'
import HeroHeader from '../HeroHeader/HeroHeader';
import HeroFooter from '../HeroFooter/HeroFooter';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getusers } from '../../actions/posts'
import './UserList.scss'

import axios from 'axios';


function UserList() {

    const dispatch = useDispatch()

    const [users, setUsers] = useState(null)

    const thisuser = JSON.parse(localStorage.getItem('profile'))

        console.log(thisuser)
    useEffect(async () => {
        const getusers = async () => {
            try {
                const res = await axios.get("/users")

                setUsers(res.data)
                console.log(res)

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
        console.log(followUser)

        try {
            const res = await axios.put("/users/follow/" + thisuser.result._id, followUser)

            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (



        <>
            <HeroHeader />
            {users?.map(user => 
            (
                <form className="user" onSubmit = {(e) => onFollow(e, user)}>
                    <div className="userWrapper">
                        <img className="userImage" src=""></img>
                    </div>
                    <div>
                        {user.name}
                    </div>
                    <div>
                        {user.email}
                    </div>
                    <div className="bcontainers">
                        <button>
                            follow
                        </button>
                    </div>
                </form>
            ))}

            <HeroFooter />
        </>
    )
}

export default UserList
