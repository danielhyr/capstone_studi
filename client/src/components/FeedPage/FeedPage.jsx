import './FeedPage.scss'
import HeroFooter from '../HeroFooter/HeroFooter';
import HeroHeader from '../HeroHeader/HeroHeader';
import PostsList from '../PostsList/PostsList';
import InitialForm from '../InitialForm/InitialForm';
import { useSelector } from 'react-redux'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'
import LoginPage from '../LoginPage/LoginPage'
import HeroImage from '../HeroImage/HeroImage';
import { motion } from 'framer-motion'
import * as api from '../../api/index'

function FeedPage({ history }) {

  const loguser = JSON.parse(localStorage.getItem('profile'))
  const posts = useSelector(state => state.posts)
  const dispatch = useDispatch()

  const [user, setUser] = useState();
  const [currentId, setCurrentId] = useState(0);



  useEffect(async () => {
    try {
      const res = await api.getSingleUser(loguser.result._id)
      setUser(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [loguser])




  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])


  return (
    <>

      {loguser ? (
        <>
   
            <HeroHeader />
            <section className="feed">
              <motion.div className="feed-inside"
                     initial={{ opacity: 0 }}
                     animate = {{opacity: 1}}
                     exit = {{opacity: 0}}>
                <HeroImage />
                <InitialForm />

                <PostsList whoose={"All"} setCurrentId={setCurrentId} posts={posts} user = {user}/>

              </motion.div>
            </section>
            <HeroFooter />
        </>
      ) : (
        <LoginPage />
      )}

    </>
  )
}

export default FeedPage
