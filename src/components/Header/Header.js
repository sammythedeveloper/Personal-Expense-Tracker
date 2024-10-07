import React, { useState } from "react";
import Logo from "../../assets/new-reworked-logo.webp";
import Banner from "../../assets/Background_1.webp";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="Header-wrapper">
        <header className="Header">
          <div className="menu-icon" onClick={toggleMenu}>
            <MenuIcon fontSize="large" style={{ cursor: "pointer" }} />{" "}
            {/* Use Material UI Menu icon */}
          </div>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <img src={Logo} alt="Logo" className="logo" />
          </Link>
          <nav className={`menu ${isMenuOpen ? "open" : ""}`}>
            <ul className={`listitems ${isMenuOpen ? "open" : ""}`}>
              <li>Our Services</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact Us</li>
            </ul>
          </nav>
        </header>
        <img src={Banner} alt="Banner" className="banner" />
      </div>
      {/* <p>NORTH AMERICAN  DISTRIBUTION SERVICES
Your Brand. Your Message. Our Audience.
Work with us</p> */}
    
    </div>
  );
};

export default Header;
