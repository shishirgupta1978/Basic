import React from 'react'
import '../../assets/styles/Header.scss';
import {Link, NavLink } from 'react-router-dom';

export const Header=(props)=> {

  return (
    <header className="header">
      <div className="logo"><Link to="/">{props.logo_url && <img src={props.logo_url} className='logoimg'/>} {props.brand_name ? props.brand_name :""}</Link></div>
      <nav className="nav">
        <ul className="nav-list">
          <li><NavLink to="/"></NavLink></li>
                  </ul>
      </nav>
      <div className="user">
         <nav className="nav">  <ul className="nav-list">
        <li>{props.contact_no ? props.contact_no :""}</li>
                </ul></nav>
      </div>
    </header>
  );
}

