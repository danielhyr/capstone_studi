import { useState, useEffect } from 'react';
import moment from 'moment';
import PostComments from '../PostComments/PostComments';
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../actions/posts'
import { useLocation, useHistory } from 'react-router-dom'
import likeIcon from '../../data/Icons/Icon-likes.svg'
import deleteIcon from '../../data/Icons/delete.svg'
import editIcon from '../../data/Icons/edit.svg'

import './SinglePost.scss'

function SinglePost(props) {

    const [show, setShow] = useState(false)

    const history = useHistory()
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('profile'))

    const handleSubmit = (e) => {
        e.preventDefault()
        props.onSubmitHandler(e, props.post._id)
    }

    const handleDelete = () => {
        dispatch(deletePost(props.post._id))
        props.onDeleteHandler()
    }

    return (
        <>
            <div className="post">
                <div className="post-left">

                    <div className="post-buttons">

                        {(user?.result.googleId === props.post?.creator || user?.result._id === props.post?.creator) && (
                            <>

                                <img onClick={handleSubmit} className="post-buttons__edit" src={editIcon} />
                                <img className = "post-buttons__del"src= {deleteIcon}  onClick={handleDelete}/>
                            </>
                        )}
                    </div>
                    <div className="post-avatarname">
                        <div className="post-avatar" onClick={() => { history.push(`/profile/${props.post?.creator}`) }}>
                            <img className="post-image" src={props.post.image}></img>
                        </div>
                        <div>
                            <p className="post-left-bottom__para">
                                {moment(props.post.timestamp).fromNow()}
                            </p>
                            <p>
                                {props.post.name}
                            </p>
                        </div>
                    </div>



                    <div className="post-left-bottom">

                        <div className="post-left-bottom__para"> {props.post.likes?.length}<img src={likeIcon} onClick={() => { dispatch(likePost(props.post._id)) }}>
                        </img>        
                        </div>
            

              
                    </div>
                </div>

                <div className="post-standup">
                    <h3 className="post-standup__header">The Standup</h3>
                    <p className="post-standup__content">{props.post.title}</p>
                    <button onClick={() => { show ? setShow(false) : setShow(true) }}>show comments</button>
                </div>

                <div className="schedulePost">
                    <h3 className="schedulePost__header" >Schedule</h3>
                    <div className="schedulePost-span">
                        <span className="schedulePost-span__spans">Time</span>
                        <span className="schedulePost-span__spans">Activity</span>
                    </div>
                    {props.post.schedule.map((item) => {
                        return (
                            <div className="schedulePost__list">
                                <div className="schedulePost__time">
                                    {item.time}
                                </div>
                                <div className="schedulePost__activity">
                                    {item.activity}
                                </div>
                            </div>
                        )
                    })}
                </div>



            </div>

            <PostComments show={show} postId={props.post._id} />

        </>
    )
}

export default SinglePost
