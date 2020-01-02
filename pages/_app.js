import React from 'react'
import Head from 'next/head'
import App from 'next/app'

import '../styles/global.css'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Thoughtless</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta httpEquiv="Content-Language" content="en" />
          <meta
            name="description"
            content="Think less, sleep more. Be Thoughtless."
          />
          <meta
            name="og:description"
            content="Think less, sleep more. Be Thoughtless."
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@pacocoursey" />
          <meta name="og:title" content="Thoughtless" />
          <meta name="og:url" content="https://thoughtless.now.sh" />
          <meta name="apple-mobile-web-app-title" content="Thoughtless" />

          {/* Favicons */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/safari-pinned-tab.svg"
            color="#000000"
          />
          <meta name="msapplication-TileColor" content="#000" />
          <meta name="theme-color" content="#000" />
        </Head>

        <Component {...pageProps} />
      </>
    )
  }
}

export default MyApp
