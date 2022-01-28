// navbar
import NavBarItem from './NavBarItem';
import styles from '../../styles/Home.module.css';
import { useUser } from '../../lib/hooks';

const NavBar = () => {
    const user = useUser();

    return (
        <nav className={styles.navbar}>
            {user ?
                (
                    <>
                        <p className="subtitle">Hello, {JSON.parse(JSON.stringify(user.username))}</p>
                        <NavBarItem link="/account/Dashboard" title="Dashboard" />
                        <NavBarItem link="/account/Friends" title="Friends" />
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