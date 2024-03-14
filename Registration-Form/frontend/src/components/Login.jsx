import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.status === 429) {
          throw new Error('Too many requests');
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }

        setError(null);
        navigate(`/${data.username}`);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handleForgotPassword(e) {
    fetch('http://localhost:5000/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMessage(data.message);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (message) setError(null);
  }, [message]);

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
          <p
            style={{ color: 'blue' }}
            onClick={(e) => handleForgotPassword(e)}
          >
            Forgot password ?
          </p>
          {message && <p> {message}</p>}
        </form>
      </div>
    </>
  );
}

export default Login;
