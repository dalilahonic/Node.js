import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

function User() {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const { username } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(null);
          setUserData(data);
          setUsernameInput(data.username);
          setEmailInput(data.email);
        }
      })
      .catch((err) => console.log(err));
  }, [username]);

  function handleUsernameUpdate(e) {
    e.preventDefault();
    fetch(`http://localhost:5000/update-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameInput,
        email: emailInput,
        oldUsername: username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        navigate(`/${data.username}`);
      })
      .catch((err) => console.log(err));
  }

  function handleEmailUpdate(e) {
    e.preventDefault();

    fetch(`http://localhost:5000/update-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameInput,
        email: emailInput,
        oldUsername: username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        navigate(`/${data.username}`);
      })
      .catch((err) => console.log(err));
  }

  if (error) {
    return <p>Page not found!</p>;
  }

  return (
    <div>
      <h1>User Information</h1>
      <h4>username: {userData?.username}</h4>{' '}
      <button
        onClick={() => setIsUserOpen((prev) => !prev)}
      >
        Edit username
      </button>
      {isUserOpen && (
        <form onSubmit={(e) => handleUsernameUpdate(e)}>
          <input
            name='username'
            value={usernameInput}
            onChange={(e) =>
              setUsernameInput(e.target.value)
            }
          />
          <button type='submit'>Submit</button>
        </form>
      )}
      <h4>email: {userData?.email}</h4>
      <button
        onClick={() => setIsEmailOpen((prev) => !prev)}
      >
        Edit email
      </button>
      {isEmailOpen && (
        <form onSubmit={(e) => handleEmailUpdate(e)}>
          <input
            name='email'
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <button type='submit'>Submit</button>
        </form>
      )}
      <button
        style={{ display: 'block', marginBlock: '10px' }}
        onClick={() =>
          navigate(`/${username}/change-password`)
        }
      >
        Change Password
      </button>
    </div>
  );
}

export default User;
