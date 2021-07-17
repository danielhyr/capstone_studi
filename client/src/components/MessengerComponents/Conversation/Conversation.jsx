import { useEffect, useState} from 'react'
import './Conversation.scss'
import axios from 'axios'
function Conversation({conversation, currentUser}) {


    const [user, setUser] = useState(null)

useEffect(() => {
    const friendId = conversation.member.find((m) => m !== currentUser.result._id)
    console.log(conversation)

    const getUser = async () => {
        try {
          const res = await axios("/users/" + friendId);
          setUser(res.data);
            console.log(res.data)
        } catch (err) {
          console.log(err);
        }
      };
      getUser();
    }, [currentUser, conversation]);

    return (
        <div className="conversation">
      <img
        className="conversation__Img"
        src=""
        alt=""
      />
      <span className="conversation__name">{user?.name}</span>
    </div>
    )
}

export default Conversation
