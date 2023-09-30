import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';
import { Input } from './Input';


export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const handleRegister = () => {
        // Add your login logic here
      };

  return (
    <div className="form">
      <h2>Register</h2>
      <Input
        type="text"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="repassword"
        label="Confirm Password"
        value={repassword}
        onChange={(e) => setRepassword(e.target.value)}
      />

      <div className='row'><div className='column'><button onClick={handleRegister}>Register</button></div></div>
      <p style={{textAlign:'left'}}>Already have an account? <NavLink to="/">click here.</NavLink></p>
    </div>
  )
}
