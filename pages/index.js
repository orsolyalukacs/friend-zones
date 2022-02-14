// home page
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { connectToDatabase } from '../util/mongodb';

export default function Home({ isConnected }) {

  return (
    <div className={styles.container}>
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
          <Link href="/account/Signup">
            <a className={styles.card}>
              <h2>Register &rarr;</h2>
              <p>Sign up to see timezones of your friends</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await connectToDatabase();
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}