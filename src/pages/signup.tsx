import { useAuth } from '@crossid/crossid-react'
import { useEffect } from 'react'

export default function Signup() {
  const { signupWithRedirect } = useAuth()
  useEffect(() => {
    signupWithRedirect({ redirect_uri: '/' })
  })

  return null
}
