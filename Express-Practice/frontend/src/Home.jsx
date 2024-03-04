import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function Home() {
  const [data, setData] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:9000')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:9000/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        navigate('/user/:id');
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1> {data?.text}</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>First Name</label>
        <input
          name='firstName'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <br />
        <label>Last Name</label>
        <input
          name='lastName'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <br />
        <button type='submit'> Submit </button>
      </form>
    </div>
  );
}
