import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from '../components/Layaout'
import Calendario from '../components/calendario/caledario'
import LogIn from '../views/Login'
import ProtectedLogin from './protected/ProtectedLogin'

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: '*',
      element: <p>Not Found</p>
    },
    {
      path: '/login',
      element: <LogIn />
    },
    {
      path: '/',
      element: (
        <ProtectedLogin>
          <Layout />
        </ProtectedLogin>
      ),
      errorElement: <p>Something went wrong</p>,
      children: [
        {
          path: '/',
          element: <Calendario date={new Date()} />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}
