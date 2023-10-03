import React, { useState, useEffect, useContext } from 'react'
import { Navbar, Container, Nav,NavDropdown , Form, FormControl, Button } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';
import { Link,NavLink } from 'react-router-dom';
import { Input } from './Input';
import jwt_decode from 'jwt-decode';
import { getAccessToken, refresh,MyContext,removeUser,BASE_URL } from '../utility';
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi"
import {MdArrowDropDown} from "react-icons/md"
import { NoProfileImg, LogoImg } from '../assets/images';
import {Badge} from  'react-bootstrap';


export const WebsiteHeader = (props) => {
  
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
    navigate(`/${props.website}/`);
  };


  return (
    <Navbar expand="lg" bg='dark' variant='dark'>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">{props.data.logo_img_url && <img height='35px' src={props.data.logo_img_url} className='logoimg'/>} {props.data.brand_name} </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">{true &&<>
            <Nav.Link as={Link} to={`/${props.website}/`}>Home</Nav.Link>
            <Nav.Link as={Link} to={`/${props.website}/cart/`}>Cart<sup style={{color:'yellow'}}></sup></Nav.Link>
            
</>}
          </Nav>

          {context.user ?
          
          <Nav className="ml-auto">
            
            <Nav.Link as={Link} to={`/${props.website}/profile/`}>Hi, {context.user.username} {false &&<img
                        src={context.user.profile_pic ? BASE_URL + context.user.profile_pic : NoProfileImg}
                        alt='profile image' style={{height:'24px'}}
                        className='rounded-circle'
                      />}</Nav.Link>
            <Nav.Link as={Link} to={`/${props.website}/changepassword/`}>Change Password</Nav.Link>
            <Nav.Link  onClick={logoutHandler}>Logout</Nav.Link>
          </Nav> :          <Nav className="ml-auto">
          <Nav.Link as={Link} to={`/${props.website}/login`}>Login</Nav.Link>
          </Nav>

       
}
          
</Navbar.Collapse>   
      </Container>
    </Navbar>
  );
};


