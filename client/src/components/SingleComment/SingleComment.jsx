import React from 'react'
import './SingleComment.scss'

function SingleComment({comment}) {
    console.log(comment)
    return (
        <div>
            single comment
            {comment.name}
            <div>
            <img src = {comment.image}></img>
            </div>
            {comment.likes.length}
            {comment.text}
        </div>
    )
}

export default SingleComment
