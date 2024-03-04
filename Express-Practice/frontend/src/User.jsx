import React, { useEffect } from 'react';

export default function User() {
  useEffect(() => {
    fetch('http://localhost:9000/form')
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  return <div>User</div>;
}
