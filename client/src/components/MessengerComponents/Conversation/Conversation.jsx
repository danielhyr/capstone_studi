import { useEffect, useState } from 'react'
import './Conversation.scss'
import * as api from '../../../api/index'
function Conversation({ conversation, currentUser }) {

    const [user, setUser] = useState(null)
    
    useEffect(() => {
        const friendId = conversation.member.find((m) => m !== currentUser.result._id)

        const getUser = async () => {
            try {
                const res = await api.getSingleUser(friendId)
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUser, conversation]);

    return (
        <div className="conversation">
            <div className="conversation__wrapper">
                <img
                    className="conversation__Img"
                    src={user?.image}
                    alt=""
                />
            </div>
            <span className="conversation__name">{user?.name}</span>
        </div>
    )
}

export default Conversation
