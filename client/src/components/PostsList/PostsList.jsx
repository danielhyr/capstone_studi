import { useState, useEffect } from 'react'
import SinglePost from '../SinglePost/SinglePost'
import { useSelector} from 'react-redux'
import EditModal from '../EditModal/EditModal'

function PostsList({setCurrentId}) {
    const [show, setShow] = useState(false)
    const [id, setId] = useState(null)
    const [post, setPost] = useState(null)
    const posts = useSelector(state => state.posts)

    useEffect( ( ) => {
         setPost(posts)
    }, )

    const onDeleteHandler = () => {
        setPost(posts)
    }

        const onSubmitHandler = (e, id) => {
            e.preventDefault()
          setShow(true)
          setId(id)
      }
      
      const onCloseHandler = (e) => {
        e.preventDefault()
        setShow(false)
    
    }

    if (!post) {
        return (
            <h1>Loading</h1>
        )
    }
      return (
      <>
      <h1>Posts</h1>
      {posts.sort(function(x,y) {
          return y.timestamp - x.timestamp
      }).map(post => {
          console.log(post)
          return (
              <div key = {post._id}>
            <SinglePost  post = {post} onSubmitHandler = {onSubmitHandler} onDeleteHandler = {onDeleteHandler} setCurrentId={setCurrentId}/>
            </div>
          )
      })}

    <EditModal show= {show} onCloseHandler = {onCloseHandler} id = {id}/>

      </>
    )
}

export default PostsList
