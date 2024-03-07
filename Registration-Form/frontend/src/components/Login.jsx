import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }

        console.log(data);

        setError(null);
        navigate(`/${data.username}`);
      })
      .then((err) => console.log(err));
  }

  return (
    <>
      <div className='wrapper'>
        <h1>Log in</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>Email</label>
          <input
            value={email}
            placeholder='Enter your email'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password</label>
          <input
            value={password}
            placeholder='Enter password'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type='submit'>Submit</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </>
  );
}

export default Login;
