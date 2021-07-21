import { useState, useEffect } from 'react';
import moment from 'moment';
import PostComments from '../PostComments/PostComments';
import { deletePost, likePost, updatePost } from '../../actions/posts'
import { useLocation, useHistory } from 'react-router-dom'
import likeIcon from '../../data/Icons/Icon-likes.svg'
import deleteIcon from '../../data/Icons/delete.svg'
import editIcon from '../../data/Icons/edit.svg'
import checkIcon from '../../data/images/checkmark.png'
import { useSelector, useDispatch } from 'react-redux';
import smallcheckIcon from '../../data/images/smallcheck.png'
import './SinglePost.scss'
import * as api from "../../api/index"

function SinglePost(props) {

    const [show, setShow] = useState(false)
    const [post, setPost] = useState(props.post)
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

    const handleClick = async () => {

        if (post.creator === user.result._id) {
            if (!post.checked) {
                try {
                    const truthy = { boolean: true }
                    const res = await api.checkPost(props.post._id, truthy)
                    console.log(res)
                    setPost(res.data)
                } catch (error) {
                    console.log(error)
                }
            } else {
                try {
                    const falsey = { boolean: false }
                    const res = await api.checkPost(props.post._id, falsey)
                    console.log(res)
                    setPost(res.data)
                } catch (error) {
                    console.log(error)
                }

            }


        }
    }

    const handleSmallClick = async (item) => {
        if (post.creator === user.result._id) {
            if (!item.checked) {
                const newPost = {
                    ...props.post, schedule: props.post.schedule.map(field => {
                        if (item.id === field.id) {
                            field.checked = true
                        }
                        return field;
                    })
                }
                try {
                    dispatch(updatePost(props.post._id, newPost))
                } catch (error) {
                    console.log(error)
                }
            } else {
                const newPost = {
                    ...props.post, schedule: props.post.schedule.map(field => {
                        if (item.id === field.id) {
                            field.checked = false
                        }
                        return field;
                    })
                }
                try {
                    dispatch(updatePost(props.post._id, newPost))
                } catch (error) {
                    console.log(error)
                }
            }

        }
    }
    return (
        <>
            <div className="post">
                <div className="post-left">


                    <div className="post-avatarname">
                        <div className="post-avatar" onClick={() => { history.push(`/profile/${props.post?.creator}`) }}>
                            <img className="post-image" src={props.post.image}></img>
                        </div>
                        <div>
                            <p className="post-left-bottom__name">
                                {props.post.name}
                            </p>
                            <p className="post-left-bottom__para">
                                Posted {moment(props.post.timestamp).fromNow()}
                            </p>

                        </div>
                    </div>




                    <div className="post-left-bottom">

                        <div className="post-left-bottom__icons"> {props.post.likes?.length} likes

                            {(user?.result.googleId === props.post?.creator || user?.result._id === props.post?.creator) && (
                                <>

                                    <img onClick={handleSubmit} className="post-left-bottom__edit" src={editIcon} />
                                    <img className="post-left-bottom__del" src={deleteIcon} onClick={handleDelete} />
                                </>
                            )}
                            <img className="post-left-bottom__like" src={likeIcon} onClick={() => { dispatch(likePost(props.post._id)) }}>
                            </img>
                        </div>



                    </div>
                </div>

                <div className="post-standup">
                    <h3 className="post-standup__header">The Standup</h3>
                    <p className="post-standup__content">{props.post.title}</p>
                    <button className="post-standup__show" onClick={() => { show ? setShow(false) : setShow(true) }}>show comments</button>
                </div>

                <div className="schedulePost">
                    {post.checked ?
                        <div className="checked">
                            <img className="checked__img" src={checkIcon} />
                        </div>
                        : null}
                    <h3 className="schedulePost__header" onClick={handleClick} >Schedule</h3>
                    <div className="schedulePost-span">
                        <span className="schedulePost-span__spans">Time</span>
                        <span className="schedulePost-span__spans">Activity</span>
                    </div>
                    {props.post.schedule.map((item) => {
                        console.log(item.id)
                        return (
                            <div className="schedulePost__list" key={item.id} onClick={() => handleSmallClick(item)}>
                                <div className="schedulePost__time">
                                    {item.time}
                                </div>
                                <div className="schedulePost__activity">
                                    {item.activity}
                                </div>
                                {item.checked ?
                                    <div className="checked">
                                        <img className="schedulePost__checked" src={smallcheckIcon} />
                                    </div>
                                    : null}
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
