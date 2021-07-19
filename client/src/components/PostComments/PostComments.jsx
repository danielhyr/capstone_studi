import { useState, useEffect } from 'react'
import './PostComments.scss'
import SingleComment from '../SingleComment/SingleComment'
import axios from 'axios'

function PostComments({ show, postId }) {
    const user = JSON.parse(localStorage.getItem('profile'))

    const [comments, setComments] = useState([])

    useEffect(async () => {
        try {
            const res = await axios.get(`/comments/${postId}`)
            setComments(res.data)
        } catch (error) {
            console.log(error)
        }
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()
        const newComment = {
            text: e.target.text.value, timestamp: new Date(),
            image: user.result.image, name: user.result.name
        }
        try {
            const res = await axios.post(`/comments/${postId}`, newComment)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        console.log(newComment)
    }

    console.log(comments)
    return (
        show ?
            <>
                <form className="comments" onSubmit={onSubmit}>
                    <div className="comments-wrap">
                        <img src={user.result.image} className="comments__image"></img>
                    </div>
                    <textarea name="text">

                    </textarea>
                    <button type="submit">Submit</button>
                </form>
                {comments?.map((comment) => {
                   return( <SingleComment comment = {comment}/>)
                }
                )}
            </>
            :
            null

    )
}

export default PostComments
