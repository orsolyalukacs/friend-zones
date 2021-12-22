// layout
import Footer from "./Footer"
import NavBar from "./NavBar"
import styles from "../../styles/layout.module.css"

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <NavBar />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;