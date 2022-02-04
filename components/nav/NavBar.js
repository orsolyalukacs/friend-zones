// navbar
import NavBarItem from './NavBarItem';
import styles from '../../styles/Home.module.css';
import { useUser } from '../../lib/hooks';
import Link from "next/link";

const NavBar = () => {
    const user = useUser();

    return (
        <nav className={styles.navbar}>
            {user ?
                (
                    <>
                        <p className="subtitle">Hello, {JSON.parse(JSON.stringify(user.username))}</p>
                        <NavBarItem link="/account/Dashboard" title="Dashboard" />
                        <div className={styles.navlink}>
                            <Link href={{
                                pathname: "/account/Friends",
                                query: { userInfo: user.username }
                            }} ><a>Friends</a></Link>
                        </div>
                        <NavBarItem link="/account/UserPage" title="Settings" />
                        <NavBarItem link="/api/account/logout" title="Log out" />
                    </>
                ) : (
                    <>
                        <NavBarItem link="/" title="Home" />
                        <NavBarItem link="/account/Signup" title="Register" />
                        <NavBarItem link="/account/Login" title="Log in" />
                    </>

                )}
        </nav>
    );
};

export default NavBar;