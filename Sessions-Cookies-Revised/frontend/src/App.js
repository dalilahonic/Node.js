import { useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isLoggedIn: true }),
    }).then((res) =>
      res.json().then((data) => {
        console.log(data);
      })
    );
  }
  return (
    <div className='App'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Fist Name</label>
        <input
          name='fName'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>Last Name</label>
        <input
          name='lName'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
}

export default App;
