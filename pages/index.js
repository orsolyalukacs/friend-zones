// home page
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NavBar from './nav/NavBar'
import Footer from './nav/Footer'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Friend Zones app</title>
        <meta name="description" content="A web app that displays a user's friends, and their associated timezones, in relation to the timezone of the user." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className={styles.main}>
        <h1 className={styles.title}>
          {/* TODO: add deployed page url*/}
          Welcome to <a href="">Friend Zones!</a>
        </h1>

        <p className={styles.description}>
          A web app that displays a user&apos;s friends, and their associated timezones, in relation to the timezone of the user.
        </p>

        <div className={styles.grid}>
          <a href="/account/login" className={styles.card}>
            <h2>Login &rarr;</h2>
            <p>Find out the current time in your friends&apos; timezone</p>
          </a>
          <a href="/account/register" className={styles.card}>
            <h2>Register &rarr;</h2>
            <p>Sign up to see timezones of your friends</p>
          </a>

        </div>
      </main>

    <Footer />
    </div>
  )
}
