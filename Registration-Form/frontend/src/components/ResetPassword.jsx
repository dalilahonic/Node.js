import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { token } = useParams();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:5000/forgot-password/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        newPassword: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          setError(null);
          navigate(`/${data.username}`);
        } else if (data.error) {
          setError(data.error);
        }
      })
      .catch((err) => setError(err.message));
  }
  return (
    <>
      <h1>Reset password</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name='newPassword'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Submit</button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
}

export default ResetPassword;
