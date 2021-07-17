import React from 'react'
import './FeedPage.scss'
import HeroFooter from '../HeroFooter/HeroFooter';
import HeroHeader from '../HeroHeader/HeroHeader';
import PostsList from '../PostsList/PostsList';
import InitialForm from '../InitialForm/InitialForm';

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts} from '../../actions/posts'
import LoginPage from '../LoginPage/LoginPage'
function FeedPage({history}) {

    const [currentId, setCurrentId] = useState(0);

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
   
        <InitialForm />
        
        <PostsList setCurrentId={setCurrentId} />

     
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
