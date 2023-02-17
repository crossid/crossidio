import { withAuth } from '@crossid/crossid-react'

/**
 * Wrap your component with this one will redirect anonymous visitors to the login page.
 * Your component will be rendered if user is already authenticated.
 */
const ProtectedRoute = ({
    children,
    path,
}) => {
    const returnTo =
        path || window.location.pathname + window.location.search

    const Comp = withAuth(children, { returnTo })
    return <Comp />
}

export default ProtectedRoute      
