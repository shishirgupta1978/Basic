import React from 'react';
import { NavLink } from 'react-router-dom';

export const ActivateUser = () => {
  return (
    <div className="form">
    <h2>Activate Your Account</h2>
                  
    <button>Activate</button>
    <p style={{textAlign:'left'}}>Back to <NavLink to="/home/login">Login Page</NavLink></p>
  </div>

  )
}
