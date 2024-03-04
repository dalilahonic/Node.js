import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './Home';
import User from './User';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/user/:id', element: <User /> },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
