import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import DebugComponent from "@/modules/DebugComponent";
import AuthProvider from "@/modules/auth/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <>
          <DebugComponent />
          <AuthProvider />
          <Analytics />
          <Component {...pageProps} />
          <Toaster />
        </>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default MyApp;
