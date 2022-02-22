// navbar
import { useState } from "react";
import Link from "next/link";
import NavBarItem from './NavBarItem';
import styles from '../../styles/Home.module.css';
import { useUser } from '../../lib/hooks';

const NavBar = () => {
    const user = useUser();

    const [isOpen, setIsOpen] = useState(false);
    const openMenu = () => setIsOpen(!isOpen);

    return (
        <nav className={styles.navbar}>
            {user ?
                (
                    <div className={styles.navcontainer}>
                        <h2 className={styles.logo}>Friend-zones</h2>
                        <p className={styles.subtitle}>Hello, {JSON.parse(JSON.stringify(user.username))}!</p>
                        <div className={!isOpen ?
                            styles.navmenu : styles.navmenu + ' ' + styles.active}>
                            {/* <NavBarItem link="/account/Dashboard" title="Dashboard" isOpen={isOpen} openMenu={openMenu} /> */}
                            <div className={styles.navlink}>
                                <Link href={{
                                    pathname: "/account/Friends",
                                    query: { userInfo: user.username }
                                }} ><a className={isOpen === false ?
                                    styles.navlink : styles.navlink + ' ' + styles.active}
                                    onClick={openMenu}>Friends</a></Link>
                            </div>
                            <NavBarItem link="/account/UserPage" title="Settings" isOpen={isOpen} openMenu={openMenu} />
                            <NavBarItem link="/api/account/logout" title="Log out" isOpen={isOpen} openMenu={openMenu} />
                        </div>
                    </div>
                ) : (
                    <div className={!isOpen ?
                        styles.navmenu : styles.navmenu + ' ' + styles.active}>
                        <NavBarItem link="/" title="Home" isOpen={isOpen} openMenu={openMenu} />
                        <NavBarItem link="/account/Signup" title="Register" isOpen={isOpen} openMenu={openMenu} />
                        <NavBarItem link="/account/Login" title="Log in" isOpen={isOpen} openMenu={openMenu} />
                    </div>

                )}
            <button className={!isOpen ?
                styles.menu : styles.menu + ' ' + styles.active}
                onClick={openMenu}
            >
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </button>
        </nav>
    );
};

export default NavBar;