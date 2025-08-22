// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    let timeoutId;
    const throttle = (func, delay) => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        func();
        timeoutId = null;
      }, delay);
    };

    const handleScroll = () => {
      throttle(() => {
        const currentScrollY = window.scrollY;
        setScrolled(currentScrollY > 20);
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setHidden(true);
        } else if (currentScrollY < lastScrollY || currentScrollY < 50) {
          setHidden(false);
        }
        setLastScrollY(currentScrollY);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = async () => {
    try {
      await fetch(`${API}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      setIsOpen(false);
      setDropdownOpen(false);
      localStorage.removeItem("usuario");
localStorage.removeItem("token");

      navigate("/");
    } catch (err) {
      console.error("Error al desloguear", err);
    }
  };

  const navItems = [
    { to: "/", label: "Inicio" },
    {
      label: "Contenido",
      children: [
        { to: "/categorias", label: "Categorías" },
        { to: "/etiquetas", label: "Etiquetas" },
      ],
    },
    { to: "/voice", label: "Voz" },
    { to: "/p/acerca-de", label: "Acerca" },
    { to: "/settings", label: "Ajustes" },
  ];

  return (
    <nav
      className={`navbar ${scrolled ? "navbar-scrolled" : ""} ${
        hidden ? "navbar-hidden" : ""
      }`}
      aria-label="Navegación principal"
    >
      <div className="navbar-container">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          <span className="brand-text">Mi</span>
          <span className="brand-accent">Blog</span>
        </Link>

        {/* Desktop menu */}
        <div className="navbar-menu">
          <ul className="navbar-nav">
            {navItems.map((item, index) =>
              item.children ? (
                <li key={index} className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    onClick={toggleDropdown}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                  </button>
                  {dropdownOpen && (
                    <ul className="dropdown-menu">
                      {item.children.map((subItem) => (
                        <li key={subItem.to}>
                          <NavLink
                            className={({ isActive }) =>
                              `dropdown-item ${isActive ? "active" : ""}`
                            }
                            to={subItem.to}
                            onClick={() => setDropdownOpen(false)}
                          >
                            {subItem.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.to} className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    to={item.to}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
            {/* Logout (desktop) */}
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link btn-logout">
                Salir
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile toggle */}
        <button
          className={`navbar-toggle ${isOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile menu */}
        <div
          className={`mobile-menu ${isOpen ? "active" : ""}`}
          id="mobile-menu"
          aria-hidden={!isOpen}
        >
          <ul className="mobile-nav">
            {navItems.map((item, index) =>
              item.children ? (
                item.children.map((subItem) => (
                  <li key={subItem.to} className="mobile-nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `mobile-nav-link ${isActive ? "active" : ""}`
                      }
                      to={subItem.to}
                      onClick={() => setIsOpen(false)}
                    >
                      {subItem.label}
                    </NavLink>
                  </li>
                ))
              ) : (
                <li key={item.to || index} className="mobile-nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `mobile-nav-link ${isActive ? "active" : ""}`
                    }
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
            {/* Logout (mobile) */}
            <li className="mobile-nav-item">
              <button
                onClick={handleLogout}
                className="mobile-nav-link btn-logout"
              >
                Salir
              </button>
            </li>
          </ul>
        </div>

        {isOpen && <div className="navbar-overlay" onClick={toggleMenu}></div>}
      </div>
    </nav>
  );
}
