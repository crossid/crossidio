import { createApp } from "vue"
import App from "./App.vue"
import { createRouter, createWebHistory } from "vue-router"
import Unprotected from "./components/Unprotected.vue"
import Protected from "./components/Protected.vue"
import { create } from "@crossid/vue-wrapper"

async function init() {
  const [AuthProvider, AuthCallback] = await create({
    tenant_id: "acme",
    client_id: "niqBcdJl9dFjaftlJ0WmI7zHKpi5hyzx",
    audience: ["acme.io"],
    scope: "openid profile email",
    redirect_uri: "https://acme.io/callback",
    post_logout_redirect_uri: "https://acme.io",
  });

  const routes = [
    {
      path: "/",
      name: "Unprotected",
      component: Unprotected,
    },
    {
      path: "/protected",
      name: "Protected",
      component: Protected,
    },
    {
      path: "/callback",
      name: "AuthCallback",
      component: AuthCallback,
    },
  ];
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  createApp(App)
    .use(router)
    .component("AuthProvider", AuthProvider)
    .component("AuthCallback", AuthCallback)
    .mount("#app")
}

init()