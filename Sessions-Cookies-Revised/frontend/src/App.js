import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Form from './Form';
import Profile from './Profile';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Form /> },
    { path: '/profile', element: <Profile /> },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
