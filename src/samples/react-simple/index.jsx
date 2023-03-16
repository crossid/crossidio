import { AuthProvider } from "@crossid/crossid-react";

const App = () => {
    return (
      <AuthProvider
        tenant_id="acme"
        client_id="<my_client>"
        redirect_uri="https://acme.io/callback"
      >
        <div>your app...</div>
    </AuthProvider>
    )
}

export default App;