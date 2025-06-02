import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    // children: [
    //   { path: '/', element: <Home /> },
    // { path: '/auth', element: <Authorize /> },
    // ],
  },
  { path: '/*', element: <PageNotFound /> },
]);
