import { useState } from 'react';
import { useNavigate } from 'react-router';

function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          navigate('/profile');
        }
      });
  }

  return (
    <div className='App'>
      <form onSubmit={(e) => handleSubmit(e)} method='POST'>
        <label>Username</label>
        <input
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit'>Log in</button>
      </form>
    </div>
  );
}

export default Form;
