import { useState, useEffect } from "react";
import { MdDarkMode } from 'react-icons/md';
import { FaSun } from 'react-icons/fa';

const DarkToggle = ({ toggleCallback }) => {
    const [activeTheme, setActiveTheme] = useState("light");
    const inactiveTheme = activeTheme === "dark" ? "light" : "dark";

    useEffect(() => {
        const savedTheme = window.localStorage.getItem("theme");
        savedTheme && setActiveTheme(savedTheme);
    }, []);

    useEffect(() => {
        document.body.dataset.theme = activeTheme;
        window.localStorage.setItem("theme", activeTheme);
    }, [activeTheme]);

    return (
        <button type="button" className="toggle-button"
            onClick={() => {
                setActiveTheme(inactiveTheme);
                toggleCallback(inactiveTheme);
            }}>
            {activeTheme === "light" ?
                (
                    <span className="sun-icon"><FaSun /></span>
                ) : (<span className="moon-icon"><MdDarkMode /></span>
                )}
        </button>
    );
};

export default DarkToggle;