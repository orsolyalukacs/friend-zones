// layout
import Footer from "../components/nav/Footer";
import Head from 'next/head';
import NavBar from "../components/nav/NavBar";
import styles from "../styles/layout.module.css";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Friend Zones app</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <meta name="description" content="A web app that displays a user's friends, and their associated timezones, in relation to the timezone of the user." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className={styles.container}>
                    <NavBar />
                    {children}
                    <Footer />
                </div>
            </main>
        </>
    );
};

export default Layout;