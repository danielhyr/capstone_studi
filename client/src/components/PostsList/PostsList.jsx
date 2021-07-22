import { useState, useEffect } from 'react'
import SinglePost from '../SinglePost/SinglePost'
import { useSelector } from 'react-redux'
import EditModal from '../EditModal/EditModal'
import './PostList.scss'
import pencil from '../../data/images/twopencils.PNG'

function PostsList({ setCurrentId, posts, whoose, user }) {
    const [show, setShow] = useState(false)
    const [id, setId] = useState(null)
    const [post, setPost] = useState(null)

    const [search, setSearch] = useState('')

    useEffect(() => {
        setPost(posts)
    }, [posts])

    const searchPost = () => {
        const searchedpost = posts.filter(post => post.title.toUpperCase().includes(search.toUpperCase()) || post.name.toUpperCase().includes(search.toUpperCase()))
        setPost(searchedpost)
    }

    const handleKeyPress = (e) => {
        if (e.code === "Enter") {
            searchPost()
        }
    }

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
            <div className="posts">
                <div className="posts__top">
                <img className="posts__pencils"src = {pencil} alt = "two pencils vertically"/>
                <h1>{whoose} Posts</h1>

                <input
                className="posts__top-input"
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder = "search for a post or username"
                /></div>
                {post?.sort(function (x, y) {
                    return y.timestamp - x.timestamp
                }).map((post, index) => {
                    return (
                        <div key={index}>
                            <SinglePost post={post} onSubmitHandler={onSubmitHandler} onDeleteHandler={onDeleteHandler} setCurrentId={setCurrentId}
                            user = {user}
                            />
                        </div>
                    )
                })}
            </div>
            <EditModal show={show} onCloseHandler={onCloseHandler} id={id} />

        </>
    )
}

export default PostsList
