import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './components/Home';
import Singup from './components/Signup';
import Login from './components/Login';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/signup', element: <Singup /> },
    { path: '/login', element: <Login /> },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
