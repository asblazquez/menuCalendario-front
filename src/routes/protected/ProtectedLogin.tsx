import { Navigate, Outlet } from 'react-router'
import { FC } from 'react'
import { useCookies } from 'react-cookie'

interface ProtectedLoginProps {
  children: React.ReactNode
}

const ProtectedLogin: FC<ProtectedLoginProps> = (props) => {
  const { children } = props
  const [cookies] = useCookies()

  return cookies.user ? children : <Navigate to="/login" />
}

export default ProtectedLogin
