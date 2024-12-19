import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from '../components/Layaout'
import Calendario from '../components/calendario/caledario'

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: '*',
      element: <p>Not Found</p>
    },
    {
      path: '/',
      element: <Layout />,
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
