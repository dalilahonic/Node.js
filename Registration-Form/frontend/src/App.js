import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './components/Home';
import Singup from './components/Signup';
import Login from './components/Login';
import User from './components/User';
import ResetPassword from './components/ResetPassword';
import VerifyEmail from './components/VerifyEmail';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/signup', element: <Singup /> },
    { path: '/login', element: <Login /> },
    { path: '/:username', element: <User /> },
    { path: '/reset-password', element: <ResetPassword /> },
    {
      path: '/verify-email/:token',
      element: <VerifyEmail />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
