import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <title>R3f Image Gallery</title>
        <meta name="theme-color" content="#00e0c4" />
        <meta property="og:image" content="/og.png" />
        <meta property="og:url" content="https://dwarvesf-r3f.netlify.app/" />
        <meta property="og:title" content="R3f Image Gallery" />
        <meta
          name="description"
          content="React three fiber image grid layout"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
