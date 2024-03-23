import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cookie, setCookie] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isLoggedIn: true }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setCookie({ isLoggedIn: true }));
  }

  function handleLogOut() {
    fetch('http://localhost:5000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isLoggedIn: false }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setCookie({ isLoggedIn: false }));
  }

  useEffect(() => {
    const loggedInCookie = Cookies.get('loggedIn');
    if (loggedInCookie === 'true') {
      setCookie({ loggedIn: true });
    } else {
      setCookie({ loggedIn: false });
    }
  }, []);

  return (
    <div className='App'>
      <form onSubmit={(e) => handleSubmit(e)} method='POST'>
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
        {!cookie?.loggedIn && (
          <button type='submit'>Log in</button>
        )}
      </form>
      {cookie?.loggedIn ? (
        <>
          <p> You are logged in</p>
          <button onClick={() => handleLogOut()}>
            Log out
          </button>
        </>
      ) : (
        <p> You are not logged in</p>
      )}
    </div>
  );
}

export default App;
