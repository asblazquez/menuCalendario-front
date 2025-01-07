import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

export interface User {
  id: string
  name: string
  email: string
}

const useUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [cookies] = useCookies()

  useEffect(() => {
    if (cookies.user) {
      setUser(cookies.user)
    }
  }, [cookies.user])

  return { user, setUser }
}

export default useUser
