import React, { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    }).then((res) =>
      res
        .json()
        .then((data) => {
          if (data.error) {
            setMessage('');
            setError(data.error);
            return;
          }
          setError(null);
          setMessage(data.message);
        })
        .catch((err) => console.log(err))
    );
  }

  return (
    <>
      <div className='wrapper'>
        <h1>Sign up</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>Username</label>
          <input
            placeholder='Enter username'
            name='username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <br />
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
          {message && <p>{message}</p>}
        </form>
      </div>
    </>
  );
}

export default Signup;
