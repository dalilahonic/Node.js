import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Profile() {
  const [data, setData] = useState({});

  const navigate = useNavigate();

  fetch('http://localhost:5000/profile', {
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => setData(data));

  function handleLogOut() {
    fetch('http://localhost:5000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) navigate('/');
      });
  }

  return (
    <div>
      Profile
      {data?.username ? (
        <p>{data.username}</p>
      ) : (
        <p>You are not logged in</p>
      )}
      <button onClick={() => handleLogOut()}>
        Log out
      </button>
    </div>
  );
}

// router.get('/profile', (req, res) => {
//     if (req.session.isLoggedIn) {
//       res.json({ username: req.session.username });
//     } else {
//       res.json({ message: 'You are not logged in' });
//     }
//   });
