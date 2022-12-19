import '../styles/globals.css'
import '../styles/dashboard.css'
import '../styles/profile.css'
import '../styles/login.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
