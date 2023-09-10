import React, { useState, useEffect, useContext } from 'react'
import '../assets/styles/Header.scss';
import {Link, NavLink } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getAccessToken, refresh,MyContext,removeUser,BASE_URL } from '../utility';
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi"
import {MdArrowDropDown} from "react-icons/md"
import { NoProfileImg, LogoImg } from '../assets/images';







export const Header=()=> {

  const { context, setContext } = useContext(MyContext);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timer, setTimer] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);

  
  useEffect(() => {
    const storedJwtToken = getAccessToken()

    if (storedJwtToken) {
      setJwtToken(storedJwtToken);
      const decodedToken = jwt_decode(storedJwtToken);
      const expirationTime = decodedToken.exp * 1000; 
      const currentTime = Date.now();
      const timeLeftInMillis = expirationTime - currentTime;

      setTimeLeft(timeLeftInMillis);

      const intervalTimer = setInterval(() => {
        const newTimeLeft = expirationTime - Date.now();
        setTimeLeft(newTimeLeft);

        if (newTimeLeft <= 0) {
          clearInterval(intervalTimer);
          setJwtToken(null);
          removeUser();
          setContext({ ...context, user: null })
        }
      }, 1000);

      setTimer(intervalTimer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [jwtToken, context.user]);

  const formatTime = (timeInMillis) => {
    const minutes = String(Math.floor(timeInMillis / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((timeInMillis % 60000) / 1000)).padStart(2, '0');

    return `${minutes}:${seconds}`;


  };





  const session = <>{timeLeft !== null ? (
    <> {formatTime(timeLeft)}</>
  ) : (
    ""
  )}    </>

  const navigate = useNavigate();


  const logoutHandler = () => {
    removeUser();
    setContext({ ...context, user: null });
    navigate("/");
  };



  return (
    <header className="header">
      <div className="logo"><Link to="/">SG{false && <img src={LogoImg} className='logoimg'/>}</Link></div>
      <nav className="nav">
        <ul className="nav-list">
          <li><NavLink to="/"></NavLink></li>
                  </ul>
      </nav>
      <div className="user">
        {context.user &&  (
        <> <nav className="nav">  <ul className="nav-list">
        <li><NavLink to="/dashboard/profile/" >Hi, {context.user.username}</NavLink> {false &&<img
                        src={context.user.profile_pic ? BASE_URL + context.user.profile_pic : NoProfileImg}
                        alt='profile image' style={{height:'24px'}}
                        className='rounded-circle'
                      />}</li>
        <li><NavLink to="/dashboard/changepassword/">Change Password</NavLink></li>
        <li className='logout' onClick={logoutHandler}>Logout</li>
                </ul></nav>
</>
        ) }
      </div>
    </header>
  );
}

