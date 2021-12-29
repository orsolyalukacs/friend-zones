// home page
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import clientPromise from '../lib/mongodb';

export default function Home({ isConnected }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Friend Zones app</title>
        <meta name="description" content="A web app that displays a user's friends, and their associated timezones, in relation to the timezone of the user." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {/* TODO: add deployed page url*/}
          Welcome to <a href="">Friend Zones!</a>
        </h1>

        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}

        <p className={styles.description}>
          A web app that displays a user&apos;s friends, and their associated timezones, in relation to the timezone of the user.
        </p>
        <div className={styles.grid}>

          <Link href="/account/Login">
            <a className={styles.card} >
              <h2>Login &rarr;</h2>
              <p>Find out the current time in your friends&apos; timezone</p>
            </a>
          </Link>
          <Link href="/account/Register">
            <a className={styles.card}>
              <h2>Register &rarr;</h2>
              <p>Sign up to see timezones of your friends</p>
            </a>
          </Link>
        </div>
      </main>

    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    await clientPromise
    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}
