import React,{useState} from 'react'
import { NavLink,useParams } from 'react-router-dom';
import { Input } from './Input';
import { Button } from 'react-bootstrap';

export const Register = () => {
    const [username, setUsername] = useState('');
    const { website } = useParams();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const handleRegister = () => {
        // Add your login logic here
      };

  return (
    <div className="form mt-2">
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

      <div className='row'><div className='column'>
      <Button variant="dark" type="submit" onClick={handleRegister}>Register</Button>
</div></div>
      <p style={{textAlign:'left'}}>Already have an account? <NavLink to={`/${website}/login/`}>click here.</NavLink></p>
    </div>
  )
}
