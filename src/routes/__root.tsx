import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AuthProvider } from "@/lib/auth";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-xl p-10 text-center">
        <h1 className="font-mono text-7xl font-bold gold-text">404</h1>
        <h2 className="mt-3 font-mono text-base tracking-tight">Signal lost</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This route is not part of the framework.
        </p>
        <a
          href="/"
          className="mt-6 inline-block rounded-md bg-primary px-4 py-2 font-mono text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
        >
          Back to overview
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-xl p-8 text-center">
        <h1 className="font-mono text-base tracking-tight">This page didn&apos;t load</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-5 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-primary px-4 py-2 font-mono text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-md border border-border bg-background/40 px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-accent"
          >
            Go home
          </a>
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
      { title: "NST Entrepreneurship · Master Framework" },
      {
        name: "description",
        content: "Execution-first founder track at Newton School of Technology.",
      },
      { property: "og:title", content: "NST Entrepreneurship · Master Framework" },
      {
        property: "og:description",
        content: "Execution-first founder track at Newton School of Technology.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "NST Entrepreneurship · Master Framework" },
      {
        name: "twitter:description",
        content: "Execution-first founder track at Newton School of Technology.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2a7e55c0-70b1-4fcd-a613-ded09b374f91/id-preview-595095a1--4acb694b-61e4-4c16-b9b2-8402d1b21473.lovable.app-1779083208777.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2a7e55c0-70b1-4fcd-a613-ded09b374f91/id-preview-595095a1--4acb694b-61e4-4c16-b9b2-8402d1b21473.lovable.app-1779083208777.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap",
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
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-[#FAF8F5] text-stone-900 antialiased selection:bg-[#C85A32]/15 selection:text-[#C85A32]">
            <AppSidebar />
            <div className="relative flex min-h-screen flex-1 flex-col overflow-x-hidden">
              <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-[#C85A32]/5 blur-3xl" />
              <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />
              <div className="absolute left-3 top-3 z-50 md:hidden">
                <SidebarTrigger className="glass-card rounded-md p-1 text-stone-700 hover:bg-stone-100" />
              </div>
              <div className="relative flex flex-1 flex-col">
                <Outlet />
              </div>
            </div>
          </div>
          <Toaster theme="light" position="top-right" />
        </SidebarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
