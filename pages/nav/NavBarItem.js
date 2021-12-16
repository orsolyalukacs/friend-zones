// navbar item
import styles from '../../styles/Home.module.css'
import Link from "next/link";

const NavBarItem = (props) => {
    return (
        <div className={styles.navlink}>
            <Link href={props.link}>
                <a>
                    {props.title}
                </a>
            </Link>
        </div>
    );
}

export default NavBarItem;