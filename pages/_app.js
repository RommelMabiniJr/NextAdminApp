//import '@/styles/globals.css'
import { LayoutProvider } from "../layout/context/layoutcontext";
import { SessionProvider } from "next-auth/react";
// import { PrimeReactProvider } from "primereact/api";

import Layout from "../layout/layout";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";

export default function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return (
      <LayoutProvider>
        {Component.getLayout(<Component {...pageProps} />)}
      </LayoutProvider>
    );
  } else {
    return (
      // <PrimeReactProvider value={{ ripple: true }}>
      <SessionProvider session={pageProps.session}>
        <LayoutProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LayoutProvider>
      </SessionProvider>
      // </PrimeReactProvider>
    );
  }
}
