import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../data/images/logo.svg";
import Search from "../../data/Icons/Icon-search.svg"
import {  useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import decode from 'jwt-decode'

import "./HeroHeader.scss";

const HeroHeader = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    history.push('/')
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;
    
    if(token) {
      const decodedToken = decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
    <nav className="nav" >
      <div className="header">
        <Link to="/" ><img className="header__logo" src={Logo} alt="studi logo, graduation hat logo" />
        </Link>
        <div className="header-container">
          <div className="header-container-input">
            <input type="search" name="search" className="header__search" placeholder="search"></input>
            <img className="header__search-img" src={Search} alt="brainflix seaerch icon" />
          </div>

          {user ? (
            <div>
              <div onClick = {() => {history.push('/profile')}} className="header-container__link">
                <img className="header-container__profile" src={user.result.imageUrl} ></img>
              </div>
              <p>{user.result.name}</p>
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <div>
              <button onClick={() => { history.push('/') }}>Login</button>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default HeroHeader;
