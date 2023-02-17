import { useAuth, useAuthActions } from '@crossid/crossid-react'

/**
 * A component that renders a signout button or
 * welcome authenticated user.
 */
const AuthButton = () => {
    let { user } = useAuth()
    let { logoutWithRedirect } = useAuthActions()

    return user ? (
        <p>
            Welcome {user.sub}
            <button
                onClick={() => {
                    logoutWithRedirect({})
                }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
}

export default AuthButton
