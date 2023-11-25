import React from "react";
import { NavLink } from 'react-router-dom';
import "./index.css";

export default function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <img
                    src="https://logos-world.net/wp-content/uploads/2021/08/Brawl-Stars-Logo-700x394.png"
                    alt="Brawl Stars Logo"
                    className="logo"
                />
            </div>
            <nav className="navbar">
                <NavLink to="/brawlers" className="nav-link">
                    Brawlers
                </NavLink>
                <NavLink to="/maps" className="nav-link">
                    Maps
                </NavLink>
                <NavLink to="/gamemodes" className="nav-link">
                    Game Mode
                </NavLink>
                <NavLink to="/avatars" className="nav-link">
                    Avatar
                </NavLink>
                <NavLink to="/about" className="nav-link">
                    About
                </NavLink>
            </nav>
        </header>
    );
}
