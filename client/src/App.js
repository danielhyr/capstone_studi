import './App.scss';
import { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch, useLocation } from "react-router-dom";
import FeedPage from './components/FeedPage/FeedPage';
import ProfilePage from './components/ProfilePage/ProfilePage';

import SessionPage from './components/SessionPage/SessionPage';
import MessengerPage from './components/MessengerPage/MessengerPage';
import UserList from './components/UserList/UserList'
import axios from 'axios';

function App() {

  const user = JSON.parse(localStorage.getItem('profile'))


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={FeedPage} />
        <Route exact path="/profile/:id" component= {ProfilePage} />
        <Route exact path = "/session" component= {SessionPage}/>
        <Route path = "/messenger"> 
            {!user ? <Redirect to = "/"/> : <MessengerPage/>}
        </Route>
        <Route path = "/users" component = {UserList}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
