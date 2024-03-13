import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

function ChangePassword() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    fetch('http://localhost:5000/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        oldPassword,
        newPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setError(data.error);
          return;
        }
        setError(null);
        navigate(`/${username}`);
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  return (
    <>
      <div style={{ padding: '50px' }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>Your old password</label>
          <input
            value={oldPassword}
            name='oldPassword'
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <label>Your new password</label>
          <input
            value={newPassword}
            name='newPassword'
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type='submit'>Submit</button>
          {error && (
            <p style={{ color: 'red' }}> {error}</p>
          )}
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
