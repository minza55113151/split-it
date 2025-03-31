import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/modules/auth/AuthProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <>
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
