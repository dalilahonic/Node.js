import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './components/Home';
import Singup from './components/Signup';
import Login from './components/Login';
import User from './components/User';
import VerifyEmail from './components/VerifyEmail';
import ChangePassword from './components/ChangePassword';
import ResetPassword from './components/ResetPassword';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/signup', element: <Singup /> },
    { path: '/login', element: <Login /> },
    { path: '/:username', element: <User /> },
    {
      path: '/:username/change-password',
      element: <ChangePassword />,
    },
    {
      path: '/verify-email/:token',
      element: <VerifyEmail />,
    },
    {
      path: '/reset-password/:token',
      element: <ResetPassword />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
