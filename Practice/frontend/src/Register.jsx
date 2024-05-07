import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();

    fetch('http://localhost:9000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        password,
        confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  function handleLogin(e) {
    e.preventDefault();
    fetch('http://localhost:9000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          navigate(`/${data.username}`);
        } else {
          console.error(data.errorMessage);
        }
      })
      .catch((error) => console.error('Error:', error));
  }

  return (
    <>
      <h1>Regsiter</h1>
      <form onSubmit={(e) => handleRegister(e)}>
        <input
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          placeholder='confirm password'
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          value={confirmPassword}
        />
        <button type='submit'>Submit</button>
      </form>

      <h1>Login</h1>
      <form onSubmit={(e) => handleLogin(e)}>
        <input
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default Register;
