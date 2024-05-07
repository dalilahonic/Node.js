import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Register from './Register';
import Profile from './Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Register />,
  },
  { path: '/:username', element: <Profile /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
