import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css"; // Asegúrate de tener estilos para el navbar

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Efecto de scroll mejorado con hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determinar si está scrolleado
      setScrolled(currentScrollY > 20);

      // Determinar si debe ocultarse
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold
        setHidden(true);
      } else if (currentScrollY < lastScrollY || currentScrollY < 50) {
        // Scrolling up or near top
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { to: "/", label: "Inicio", icon: "🏠" },
    { to: "/categorias", label: "Categorías", icon: "📂" },
    { to: "/etiquetas", label: "Etiquetas", icon: "🏷️" },
    { to: "/p/acerca-de", label: "Acerca", icon: "ℹ️" },
  ];

  return (
    <nav
      className={`navbar ${scrolled ? "navbar-scrolled" : ""} ${
        hidden ? "navbar-hidden" : ""
      }`}
    >
      <div className="navbar-container">
        {/* Logo/Brand - más compacto */}
        <Link className="navbar-brand" to="/">
          <span className="brand-text">Mi</span>
          <span className="brand-accent">Blog</span>
        </Link>

        {/* Navigation Menu - horizontal centrado */}
        <div className="navbar-menu">
          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li key={item.to} className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to={item.to}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`navbar-toggle ${isOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
          <ul className="mobile-nav">
            {navItems.map((item) => (
              <li key={item.to} className="mobile-nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `mobile-nav-link ${isActive ? "active" : ""}`
                  }
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Overlay for mobile menu */}
        {isOpen && <div className="navbar-overlay" onClick={toggleMenu}></div>}
      </div>
    </nav>
  );
}
