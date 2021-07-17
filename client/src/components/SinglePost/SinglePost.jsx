import React from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../actions/posts'

function SinglePost(props) {

    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('profile'))

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(props.post._id)
        props.onSubmitHandler(e, props.post._id)
    }

    const handleDelete = () => {
        dispatch(deletePost(props.post._id))
        props.onDeleteHandler()
    }

    return (
        <div className="post">
        <div>PRofile image
            <img></img>
        </div>
        <div>
            {props.post.name}
        </div>
        <div>
            {props.post.title}
        </div>
        <div>
        {moment(props.post.timestamp).fromNow()}
        </div>
        <div>
            {props.post.likes.length}
        </div>
        <div>
            {props.post.schedule.map((item) => {
                return(
                    <div>
                        <div>
                            {item.time}
                        </div>
                        <div>
                            {item.activity}
                        </div>
                    </div>
                )
            })}
        </div>

        <button onClick = {() => {dispatch(likePost(props.post._id))}}>Like</button>
            {(user?.result.googleId === props.post?.creator || user?.result._id ===props.post?.creator )&& (
                <>
                        <button onClick = {handleDelete}>Delete</button>
                        <button onClick = {handleSubmit}>Edit</button>
                        </>
            )}

     
 

    </div>
    )
}

export default SinglePost
