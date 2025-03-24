import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import DebugComponent from "@/modules/DebugComponent";
import AuthProvider from "@/modules/auth/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <>
          <DebugComponent />
          <AuthProvider />
          <Component {...pageProps} />
        </>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default MyApp;
