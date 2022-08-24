import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { StrictMode, Suspense } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <Suspense fallback={<>Loading...</>}>
        <Component {...pageProps} />
      </Suspense>
    </StrictMode>
  )
}

export default MyApp
