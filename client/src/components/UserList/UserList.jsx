import { useState, useEffect } from 'react'
import HeroHeader from '../HeroHeader/HeroHeader';
import HeroFooter from '../HeroFooter/HeroFooter';
import './UserList.scss'
import * as api from '../../api/index'


function UserList() {
    const [users, setUsers] = useState(null)
    const thisuser = JSON.parse(localStorage.getItem('profile'))

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
        console.log(followUser)

        try {
            const res = await api.followUser(thisuser.result._id, followUser)
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
                <form className="user" onSubmit={(e) => onFollow(e, user)}>
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
