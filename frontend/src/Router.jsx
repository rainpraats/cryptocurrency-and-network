import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  { path: '/*', element: <PageNotFound /> },
]);
