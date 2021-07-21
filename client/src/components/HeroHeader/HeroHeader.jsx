import { useState, useEffect } from "react";
import Logo from "../../data/images/logo.svg";
import Search from "../../data/Icons/Icon-search.svg"
import { useLocation, useHistory, Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import decode from 'jwt-decode'

import "./HeroHeader.scss";

const HeroHeader = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [show, setShow] = useState("showfalse")


  const dropDown = () => {
    if (show === "showfalse") setShow("showtrue")
    else setShow("showfalse")
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    history.push('/')
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
    <nav className="nav" >
      <div className="header">
  
        <h1 onClick = {() => history.push('/')}className = "header__logo">Standup</h1>
        <div className="header-container">
          <div className="header-container-input">
            <input type="search" name="search" className="header__search" placeholder="search"></input>
            <img className="header__search-img" src={Search} alt="search icon magnifying glass" onClick = {() => history.push('/users')}/>
          </div>

          {user ? (
            <div className="dropdown">
              <div className="header-container__link" onClick={dropDown}>
                <img className="header-container__profile" src={user.result.image} ></img>
              </div>
              <ul className={show}>

                <li className="showtrue__menu" onClick={() => { history.push(`/profile/${user.result._id}`) }}>{user.result.name}
                </li>
                <li className="showtrue__menu" onClick={() => { history.push('/session') }}>Start a Session</li>
                <div  onClick={() => { history.push(`/messenger`) }}> <li className="showtrue__menu">Chat with friends</li>
                
                </div>
               
                <button className = "dropdown__button"onClick={logout}>Logout</button>
              </ul>
            </div>
          ) : (
            <div>
              <button className = "dropdown__button "onClick={() => { history.push('/') }}>Login</button>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default HeroHeader;
