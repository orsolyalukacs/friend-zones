// navbar item
import styles from '../../styles/Home.module.css';
import Link from "next/link";

const NavBarItem = ({ link, title, isOpen, openMenu }) => {
    return (
        <div className={styles.navlink}>
            <Link href={link}>
                <a className={!isOpen ?
                    styles.navlink : styles.navlink + ' ' + styles.active}
                    onClick={openMenu}>
                    {title}
                </a>
            </Link>
        </div>
    );
};

export default NavBarItem;