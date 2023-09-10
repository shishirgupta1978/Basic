// Login.js
import React, { useState } from 'react';
import '../assets/styles/Form.scss'; // Import Sass for Login component
import { NavLink } from 'react-router-dom';
import { Input } from './Input';

export const ForgetPassword=()=> {
  const [Email, setEmail] = useState('');

  const handleEmail = () => {
    // Add your login logic here
  };

  return (
    <div className="form">
      <h2>Forget Password</h2>
      <Input
        type="email"
        label="Email Address"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
      />
					
      <button onClick={handleEmail}>Send Email</button>
      <p style={{textAlign:'left'}}>Back to <NavLink to="/">Login Page</NavLink></p>
    </div>
  );
}

