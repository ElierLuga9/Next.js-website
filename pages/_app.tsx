import { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import "public/styles.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentNode?.removeChild(jssStyles);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Outer Reach</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}
