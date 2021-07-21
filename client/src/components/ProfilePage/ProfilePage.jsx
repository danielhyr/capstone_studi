
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'
import { useHistory } from 'react-router-dom'
import HeroFooter from '../HeroFooter/HeroFooter';
import HeroHeader from '../HeroHeader/HeroHeader';
import PostsList from '../PostsList/PostsList';
import ProfileModal from '../ProfileModal/ProfileModal'
import './ProfilePage.scss'
import * as api from '../../api/index'

function ProfilePage(props) {
    const [currentId, setCurrentId] = useState(0);
    const posts = useSelector(state => state.posts)

    const [user, setUser] = useState(null)

    const [userposts, setUserposts] = useState()
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [fdecider, setFdecider] = useState(null)

    const currentuser = JSON.parse(localStorage.getItem('profile'))

    const history = useHistory()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    useEffect(async () => {
        await setUserposts(posts.filter(post => post.creator === props.match.params.id))
     
    }, [posts, props.match.params.id])

    useEffect(async () => {
        try {
            const res = await api.getSingleUser(props.match.params.id)
            setUser(res.data)
        } catch (error) {
            console.log(error)
        }
    }, [props.match.params.id])


    useEffect(async () => {
        try {
            const res = await api.getSingleUser(currentuser?.result._id)
            const followArr = res.data.following.find(f => f.userId === props.match.params.id)
            setFdecider(followArr)
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
        try {
            const res = await api.followUser(currentuser.result._id, followUser)
            const followArr = res.data.following.find(f => f.userId === props.match.params.id)
            setFdecider(followArr)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <HeroHeader />

            <div className="profileOver">
                <section className="profile">


                    <div className="profile-right">
                        <div className="profile__details">
                            <div className="profile__about">
                                <h2>About</h2>
                                <p>{user?.about}</p>
                            </div>
                            <div className="profile__interests">
                                <h2>Interests</h2>
                                <p>{user?.interests}</p>
                            </div>
                        </div>
                        <div className="profile-picFollow">
                            <div className="profile-pic">
                                <img className="profile-image" src={user?.image} />
                            </div>
                            {currentuser.result._id !== props.match.params.id ?
                                <>
                                    <button className="profile__fbutton" onClick={(e) => onFollow(e, user)}> {currentuser.result._id !== props.match.params.id && !fdecider ? "Follow" : " Unfollow"}</button>
                                </>
                                : null}
                        </div>


                    </div>

                    <div className="profile-desc">
                        <h1 className="profile__name"> {user?.name}</h1>
                        <div>{user?.email}</div>
                        <div className="follow"><p>
                            Currently following {user?.following.length} people</p>
                            <div className="follow-container">
                                {user?.following.map(us => {
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
                            <button className="profile-desc__edit" onClick={() => setShow(true)}>. . .</button>

                            : null
                        }
                    </div>
                </section>
                <PostsList whoose={`${user?.name}'s`} setCurrentId={setCurrentId} posts={userposts} />
                <ProfileModal show={show} setShow={setShow} id={props.match.params.id}
                    user={user} setUser={setUser} />
            </div>
            <HeroFooter />

        </>
    )
}

export default ProfilePage
