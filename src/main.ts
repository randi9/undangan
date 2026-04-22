import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";

function shouldEnableClerk(pathname: string) {
  return (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/sign-up")
  );
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkEnabled = shouldEnableClerk(globalThis.location.pathname);

globalThis.__CLERK_ENABLED__ = clerkEnabled;

if (clerkEnabled && !PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

async function bootstrap() {
  const RootComponent = clerkEnabled
    ? (await import("./App.vue")).default
    : (await import("./AppNoClerk.vue")).default;

  const app = createApp(RootComponent);

  app.use(createPinia());
  app.use(router);

  if (clerkEnabled) {
    const { clerkPlugin } = await import("@clerk/vue");
    app.use(clerkPlugin, {
      publishableKey: PUBLISHABLE_KEY,
      signInUrl: "/login",
      signUpUrl: "/sign-up",
    });
  }

  app.mount("#app");
}

void bootstrap();
