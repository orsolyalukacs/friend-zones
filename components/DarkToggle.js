import { useState, useEffect } from "react";
import { MdDarkMode } from 'react-icons/md';
import { FaSun } from 'react-icons/fa';

const DarkToggle = () => {
    const [activeTheme, setActiveTheme] = useState("light");
    const inactiveTheme = activeTheme === "light" ? "dark" : "light";

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
            onClick={() => setActiveTheme(inactiveTheme)}>
            {activeTheme === "light" ?
                (
                    <span className="sun-icon"><FaSun /></span>
                ) : (<span className="moon-icon"><MdDarkMode /></span>
                )}
        </button>
    );
};

export default DarkToggle;