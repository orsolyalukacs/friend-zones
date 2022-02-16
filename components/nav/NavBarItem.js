// navbar item
import styles from '../../styles/Home.module.css';
import Link from "next/link";

const NavBarItem = ({ link, title }) => {
    return (
        <div className={styles.navlink}>
            <Link href={link}>
                <a>
                    {title}
                </a>
            </Link>
        </div>
    );
};

export default NavBarItem;