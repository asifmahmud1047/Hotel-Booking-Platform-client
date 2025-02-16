import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Rooms from '../pages/Rooms';
import RoomDetails from '../pages/RoomDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MyBookings from '../pages/Dashboard/MyBookings';
import ErrorPage from '../pages/ErrorPage';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/rooms',
        element: <Rooms />,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/rooms`)
      },
      {
        path: '/rooms/:id',
        element: <RoomDetails />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/rooms/${params.id}`)
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/bookings/${params.email}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('access-token')}`
          }
        })
      }
    ]
  }
]);

export default router;

