import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

function VerifyEmail() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [err, setErr] = useState('');

  function handleClick() {
    fetch('http://localhost:5000/verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setErr(null);
          navigate('/login');
        } else if (data.error) setErr(data.error);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <button
        style={{ margin: '100px' }}
        onClick={handleClick}
      >
        Verify Email
      </button>

      {err && <p>{err}</p>}
    </>
  );
}

export default VerifyEmail;
