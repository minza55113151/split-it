import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <meta name="application-name" content="SplitIt" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="SplitIt" />
      <meta name="description" content="SplitIt" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <link rel="apple-touch-icon" href="/ios/180.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/ios/152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/ios/180.png" />
      <link rel="apple-touch-icon" sizes="167x167" href="/ios/167.png" />

      <link rel="icon" type="image/png" sizes="32x32" href="/ios/32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/ios/16.png" />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=optional"
      />
      {/* 
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://yourdomain.com" />
      <meta name="twitter:title" content="SplitIt" />
      <meta name="twitter:description" content="Best SplitIt in the world" />
      <meta
        name="twitter:image"
        content="https://yourdomain.com/icons/android-chrome-192x192.png"
      />
      <meta name="twitter:creator" content="@DavidWShadow" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="SplitIt" />
      <meta property="og:description" content="Best SplitIt in the world" />
      <meta property="og:site_name" content="SplitIt" />
      <meta property="og:url" content="https://yourdomain.com" />
      <meta
        property="og:image"
        content="https://yourdomain.com/icons/apple-touch-icon.png"
      /> */}
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
