import React from 'react';
import { useNavigate } from 'react-router';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <p onClick={() => navigate('/signup')}>Signup</p>
      <p onClick={() => navigate('/login')}>Login</p>
    </div>
  );
}

export default Home;
