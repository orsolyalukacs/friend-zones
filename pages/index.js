// home page
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useUser } from '../lib/hooks';

export default function Home() {
  const user = useUser();

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          Welcome to <a href="https://friend-zones.vercel.app/">Friend Zones!</a>
        </h1>

        <p className={styles.description}>
          A web app that displays a user&apos;s friends, and their associated timezones, in relation to the timezone of the user.
        </p>
        {!user ?
          <div className={styles.grid}>

            <Link href="/account/Login">
              <a className="card index-card">
                <h2>Login &rarr;</h2>
                <p>Find out the current time in your friends&apos; timezone</p>
              </a>
            </Link>
            <Link href="/account/Signup">
              <a className="card index-card">
                <h2>Register &rarr;</h2>
                <p>Sign up to see timezones of your friends</p>
              </a>
            </Link>
          </div> : <></>}
      </main>
    </div >
  );
}
