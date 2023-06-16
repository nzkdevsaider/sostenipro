import "@sostenipro/styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [supabase] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ThemeProvider>
        <Head>
          <title>SosteniPro</title>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionContextProvider>
  );
}
