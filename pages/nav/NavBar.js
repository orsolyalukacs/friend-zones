// navbar
import styles from '../../styles/Home.module.css'
import NavBarItem from './NavBarItem'
// TODO: only show navbar when user is logged in
const NavBar = () => {
    return (
        <nav className={styles.navbar}>
            <NavBarItem link="/" title="Home" />
            <NavBarItem link="/account/Register" title="Register" />
            <NavBarItem link="/account/Login" title="Log in/out" />
        </nav>
    );
}

export default NavBar;