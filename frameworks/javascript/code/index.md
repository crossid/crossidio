---
name: index.html
lang: html
---

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1.*/css/pico.min.css" />
    <title>Crossid sample with Vanilla js</title>
    <style>
      mark:empty {
        padding: 0px;
      }
    </style>
  </head>
  <body>
    <script type="module">
      // section:start import_client
      import { newCrossidClient } from 'https://unpkg.com/@crossid/crossid-spa-js@0.4.6/dist/index.js'
      // section:end
      // section:start create_client
      // settings
      //
      const domain = '{{tenant_domain}}'
      const client_id = '{{client_id}}'
      const redirect_uri = '{{login_redirect_uri}}'
      // section:end

      window.onload = async () => {
        try {
          // section:start create_client
          // instantiate a new client instance
          const client = await newCrossidClient({
            domain,
            // your oauth2 client_id
            client_id,
            authorizationOpts: {
              // the audience to request access for
              audience: ['default'],
              // the scopes to be requested
              scope: 'customer openid profile email',
              // where to redirect upon a completion of a successful login
              redirect_uri,
            },
            cache_type: 'session_storage',
          })
          // section:end

          const qp = new URLSearchParams(window.location.search)

          // 'code' query param means the user was signed in successfully and we should complete the login flow.
          if (qp.has('code')) {
            // section:start login_callback
            // completes the flow, exchange a code with a token
            await client.handleRedirectCallback()
            // remove the 'code' query param from URL
            window.history.replaceState(null, document.title, '/')
            // section:end
          } else if (qp.has('state')) {
            // section:start logout_callback
            // only 'state' without 'code' means we successfully logged-out, we should complete the logout flow.
            await client.handleLogoutRedirectCallback()
            // remove 'state' query param from URL
            window.history.replaceState(null, document.title, '/')
            // section:end
          }

          // section:start signup
          // signup click event
          document.getElementById('signup').addEventListener('click', async () => {
            await client.signupWithRedirect()
          })
          // section:end

          // section:start login
          // login click event
          document.getElementById('login').addEventListener('click', async () => {
            await client.loginWithRedirect()
          })
          // section:end

          // section:start logout
          // logout click event
          document.getElementById('logout').addEventListener('click', async () => {
            await client.logoutWithRedirect({
              // configures the logout action to redirect back to current location
              post_logout_redirect_uri: window.location.origin,
            })
          })
          // section:end

          // section:start show_user_profile
          // get user & token from cache.
          const user = await client.getUser()
          const token = await client.introspectAccessToken()
          // section:end
          if (user) {
            document.getElementById('login').style.display = 'none'
            document.getElementById('signup').style.display = 'none'
            document.getElementById('logout').style.display = 'inline'
            // section:start show_user_profile
            document.getElementById('profile').innerHTML = `Hi ${
              user.email
            }<br/><br/>Allowed scopes: ${token.scp.join(', ')}<br/>
            Token expires at: ${new Date(token.exp * 1000)}`
            // section:end
          } else {
            document.getElementById('login').style.display = 'inline'
            document.getElementById('signup').style.display = 'inline'
            document.getElementById('logout').style.display = 'none'
            document.getElementById(
              'profile'
            ).innerHTML = `User is not authenticated, please signup or login.`
            document.getElementById('logout').style.display = 'none'
          }
        } catch (e) {
          document.getElementById('message').innerHTML = e
        }
      }
    </script>

    <nav class="container-fluid">
      <ul>
        <li>
          <a href="./" class="contrast" onclick="event.preventDefault()"><strong>Home</strong></a>
        </li>
        <li>
          <a href="https://crossid.io/docs/framework/javascript" class="contrast"
            ><strong>JS Docs</strong></a
          >
        </li>
      </ul>
    </nav>
    <main class="container">
      <mark id="message"></mark>
      <hgroup>
        <h1>Welcome.</h1>
        <h2>This sample demonstrates how to integrate Crossid using vanilla Javascript.</h2>
      </hgroup>
      <!-- section:start signup -->
      <a id="signup" href="#" role="button" style="display: none">Signup</a>
      <!-- section:end -->
      <!-- section:start login -->
      <a id="login" href="#" role="button" style="display: none">Login</a>
      <!-- section:end -->
      <!-- section:start logout -->
      <a id="logout" href="#" role="button" style="display: none">Logout</a>
      <!-- section:end -->
      <!-- section:start show_user_profile -->
      <article id="profile"></article>
      <!-- section:end -->
    </main>
    <footer class="container">
      <small
        ><a href="https://crossid.io">Crossid.io</a> • <a href="https://crossid.io/docs">Docs</a> •
        <a href="https://crossid.io/blog">Blog</a></small
      >
    </footer>
  </body>
</html>
```
