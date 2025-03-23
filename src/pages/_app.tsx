import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import DebugComponent from "@/modules/DebugComponent";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <>
        <DebugComponent />
        <Component {...pageProps} />
      </>
    </ClerkProvider>
  );
}

export default MyApp;
