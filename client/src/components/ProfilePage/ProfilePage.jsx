
import { useState, useEffect } from 'react'
import './ProfilePage.scss'
import HeroFooter from '../HeroFooter/HeroFooter';
import HeroHeader from '../HeroHeader/HeroHeader';
import PostsList from '../PostsList/PostsList';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'
import axios from 'axios';
import ProfileModal from '../ProfileModal/ProfileModal'
import './ProfilePage.scss'
import { useHistory } from 'react-router-dom'
function ProfilePage(props) {
    const [currentId, setCurrentId] = useState(0);
    const posts = useSelector(state => state.posts)

    const [user, setUser] = useState(null)

    const [userposts, setUserposts] = useState()
    console.log(posts)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)

    const currentuser = JSON.parse(localStorage.getItem('profile'))

    const history = useHistory()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    useEffect(async () => {
        await setUserposts(posts.filter(post => post.creator === props.match.params.id))
        console.log(posts.filter(post => post.creator === props.match.params.id))
    }, [posts])


    useEffect(async () => {
        try {
            const res = await axios.get(`/users/${props.match.params.id}`)
            setUser(res.data)

        } catch (error) {
            console.log(error)
        }

    }, [props.match.params.id])


    const onFollow = async (e, user) => {
        e.preventDefault()
        const followUser = {
            name: user.name,
            userId: user._id
        }
        console.log(followUser)

        try {
            const res = await axios.put("/users/follow/" + currentuser.result._id, followUser)

            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <HeroHeader />
            <section className="profile">
                <div className="profile-desc">
                    <h1 className="profile__name"> {user?.name}</h1>
                    <div>{user?.email}</div>
                    <div className="follow"><p>
                        Currently following {user?.following.length} people</p>
                        <div className="follow-container">
                            {user?.following.map(us => {
                                console.log(us)
                                return (
                                    <div className="follow__users"
                                        onClick={() => history.push(`/profile/${us.userId}`)}
                                    >{us.name}
                                    </div>


                                )

                            })}
                        </div>
                    </div>
                    {currentuser.result._id === props.match.params.id ?
                        <>
                            <button onClick={() => setShow(true)}>Edit Profile</button>
                        </>
                        : null
                    }
                </div>
                <div className="profile__details">
                    <h2>About</h2>
                    <p>{user?.about}</p>
                    <h2>Interests</h2>
                    <p>{user?.interests}</p>
                </div>
                <div>
                    <div className="profile-pic">
                        <img className="profile-image" src={user?.image} />


                    </div>
                    {currentuser.result.following.find(userd => userd.userId === user?._id) === -1 ?
                        <>

                            <div>
                                follow
                            </div>)
                        </>
                        : <div>Unfollow</div>}

                    {currentuser.result._id !== props.match.params.id ?
                        <>


                            <button onClick={(e) => onFollow(e, user)}>Follow</button>
                        </>
                        : null}
                </div>
            </section>

            <PostsList whoose={"Your Previous"} setCurrentId={setCurrentId} posts={userposts} />
            <ProfileModal show={show} setShow={setShow} id={props.match.params.id}
                user={user} setUser={setUser} />
            <HeroFooter />
        </>
    )
}

export default ProfilePage
