import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CrossidAuthProvider as AuthProvider } from "@crossid/crossid-react";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AuthButton from "./AuthButton.jsx";

const redirectTo = window.location.origin +"/"
const App = () => {
  return (
    <AuthProvider
      tenant_id="acme"
      client_id="niqBcdJl9dFjaftlJ0WmI7zHKpi5hyzx"
      redirect_uri={redirectTo}
      post_logout_redirect_uri={redirectTo}
      audience="acme.io"
      scope="openid profile email"
      cache_type="session_storage"
    >
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>
          <AuthButton />
          <Switch>
            <Route path="/public">
              <h3>Public</h3>
            </Route>
            <Route path="/protected">
              <ProtectedRoute path="/protected">
                {() => <h3>Protected</h3>}
              </ProtectedRoute>
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
