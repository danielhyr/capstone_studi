import { useState, useEffect } from 'react'
import './PostComments.scss'
import SingleComment from '../SingleComment/SingleComment'
import * as api from '../../api/index'

function PostComments({ show, postId }) {
    const user = JSON.parse(localStorage.getItem('profile'))

    const [comments, setComments] = useState([])

    useEffect(async () => {
        try {
            const res = await api.getComments(postId)
            setComments(res.data)
        } catch (error) {
            console.log(error)
        }
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()
        const newComment = {
            text: e.target.text.value, timestamp: Date.now(),
            image: user.result.image, name: user.result.name, posterId: user.result._id
        }
        try {
            const res = await api.postComment(postId, newComment)
            setComments(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        show ?
            <section className="commentWrap">
                <form className="comments" onSubmit={onSubmit}>
                    <div className="comments-wrap">
                        <img src={user.result.image} className="comments__image"></img>
                    </div>
                    <textarea name="text" className="comments__text" required>

                    </textarea>
                    <button type="submit" className="comments__button">Submit</button>
                </form>
                {comments?.sort(function (x, y) {
                    return y.timestamp - x.timestamp
                }).map((comment, index) => {
                    return (
                <SingleComment comment={comment} setComments= {setComments} postId = {postId} index= {index}/>)
                }
                )}
            </section>
            :
            null

    )
}

export default PostComments
