import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/api";
import { classroomStore, type User } from "@/lib/classroomStore";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-bold text-plum-dark">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-full bg-plum-dark px-5 py-2.5 text-sm font-semibold text-cream hover:bg-plum"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try again or head back home.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-plum-dark px-5 py-2.5 text-sm font-semibold text-cream"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Axon Academy — Train. Certify. Get Placed." },
      { name: "description", content: "India's #1 paramedical training academy. Live classes, proctored exams, blockchain certificates, 95% placement rate across 200+ partner hospitals." },
      { property: "og:title", content: "Axon Academy" },
      { property: "og:description", content: "Train. Certify. Get placed in leading hospitals." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    // On every page load, verify the stored token is still valid with the server.
    // This prevents "not logged in" errors after refresh.
    getCurrentUser()
      .then((payload) => {
        const backendUser = payload.user;
        const role = backendUser.role === "student" ? "student" : "admin";
        const currentUser: User = {
          id: backendUser._id,
          name: `${backendUser.firstName || ""} ${backendUser.lastName || ""}`.trim() || backendUser.email,
          email: backendUser.email,
          phone: backendUser.phone,
          role,
        };
        classroomStore.setState(() => ({ currentUser }));
      })
      .catch(() => {
        // Token invalid or expired — clear stored session
        classroomStore.setState(() => ({ currentUser: null }));
      })
      .finally(() => {
        setAuthReady(true);
      });
  }, []);

  if (!authReady) {
    // Show a minimal loading screen while we verify auth
    return (
      <QueryClientProvider client={queryClient}>
        <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#faf9f7' }}>
          <div style={{ width: 32, height: 32, border: '3px solid #e5e7eb', borderTopColor: '#4c1d95', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
