import React from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { GameProvider } from '../context/game';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Volley</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </>
  );
}

export default MyApp;
