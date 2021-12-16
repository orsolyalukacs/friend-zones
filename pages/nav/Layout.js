import Footer from "./Footer";
import NavBar from "./NavBar";

// layout
const Layout = ({ children }) => {
    return (
        <div className="content">
            <NavBar />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;