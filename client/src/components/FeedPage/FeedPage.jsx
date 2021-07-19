import './FeedPage.scss'
import HeroFooter from '../HeroFooter/HeroFooter';
import HeroHeader from '../HeroHeader/HeroHeader';
import PostsList from '../PostsList/PostsList';
import InitialForm from '../InitialForm/InitialForm';
import { useSelector } from 'react-redux'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts} from '../../actions/posts'
import LoginPage from '../LoginPage/LoginPage'
import HeroImage from '../HeroImage/HeroImage';
function FeedPage({history}) {

  const [currentId, setCurrentId] = useState(0);
  const posts = useSelector(state => state.posts)
  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

 
  const user = JSON.parse(localStorage.getItem('profile'))
    return (
        <>

        {user ?(      
          <>
        <HeroHeader history = {history}/>
        <section className="feed">
          <HeroImage/>
        <InitialForm />
        
        <PostsList whoose = {"All"} setCurrentId={setCurrentId} posts = {posts} />

     
        </section>
        <HeroFooter/>
        </>
        ) : (
         <LoginPage/>
        )}

        </>
    )
}

export default FeedPage
