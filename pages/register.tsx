import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SignupPage from '../components/SignupPage'

const Register: NextPage = () => {

  return (
    <div>
      <Head>
        <title>Oregon Melee - Register</title>
        <meta name="description" content="Created by @xMykeB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{textAlign: 'center', width: '100vw'}}>

        <SignupPage />

      </main>

      <footer>

      </footer>

    </div>
  )
}

export default Register
