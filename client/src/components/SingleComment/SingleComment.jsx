import React from 'react'
import './SingleComment.scss'
import moment from 'moment';
import deleteIcon from '../../data/Icons/delete.svg'
import * as api from '../../api/index'

function SingleComment({ comment, setComments, postId}) {


    const onDeleteHandler = async () => {
        try {  
            const res = await api.deleteComment(comment._id, postId)
            setComments(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="singlecom">
            <div className="singlecom__comment">
                <div className="singlecom-left">


                    <div className="singlecom-avatar">
                        <img className="singlecom__image" src={comment.image} />
                    </div>
                    <div className="singlecom-prop">
                        <p className="singlecom__date">{moment(Number(comment.timestamp)).fromNow()}</p>

                        <img className="singlecom__del" src={deleteIcon} onClick = {onDeleteHandler}/>
                        <p className="singlecom__elem">{comment.name}</p>
                        <p className="singlecom-right">{comment.text}</p>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default SingleComment
