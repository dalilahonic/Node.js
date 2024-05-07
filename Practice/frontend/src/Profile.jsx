import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function Profile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:9000/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          username,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errorMessage) {
            setUserData(null);
            throw new Error(data.errorMessage);
          }
          setUserData(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [username]);

  return (
    <>
      <h1>Profile</h1>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
        </div>
      )}
    </>
  );
}

export default Profile;
