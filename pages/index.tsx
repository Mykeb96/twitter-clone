import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import LoginPage from '../components/LoginPage'

const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>Oregon Melee - Login</title>
        <meta name="description" content="Created by @xMykeB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{textAlign: 'center', width: '100vw'}}>

        <LoginPage />

      </main>

      <footer>

      </footer>

    </div>
  )
}

export default Home
