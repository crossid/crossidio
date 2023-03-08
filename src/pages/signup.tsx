import { useAuth } from '@crossid/crossid-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Signup() {
  const { query } = useRouter()
  const { signupWithRedirect } = useAuth()
  useEffect(() => {
    signupWithRedirect({
      audience: ['management'],
      state: {
        return_to: query.return_to,
      },
    })
  })

  return null
}
