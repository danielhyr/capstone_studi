import React from 'react'
import './SingleComment.scss'
import moment from 'moment';

function SingleComment({ comment }) {
    console.log(comment)
    console.log(comment.timestamp)
    return (
        <div className="singlecom">
            <div className="singlecom__comment">
                <div  className="singlecom-left">


                    <div className="singlecom-avatar">
                        <img className="singlecom__image" src={comment.image} />
                    </div>
                    <div className="singlecom-prop">
                        <p className="singlecom__date">{moment(Number(comment.timestamp)).fromNow()}</p>
                        <p className="singlecom__elem">{comment.name}</p>
                    </div>
                </div>
                <p  className="singlecom-right">{comment.text}</p>

            </div>
        </div>
    )
}

export default SingleComment
