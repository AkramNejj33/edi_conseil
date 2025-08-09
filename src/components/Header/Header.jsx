import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";

const nav__links = [
  {
    path: "#accueil",
    display: "Accueil",
  },
  {
    path: "#services",
    display: "Services",
  },
  {
    path: "#apropos",
    display: "À propos",
  },
  {
    path: "#contact",
    display: "Contact",
  },
  {
    path: "/rendez-vous",
    display: "Rendez-vous",
  },
];

const Header = ({ theme, toggleTheme }) => {
  const headerRef = useRef(null);
  const location = useLocation();

  const menuRef = useRef(null) 

  const headerFunc = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("header__shrink");
    } else {
      headerRef.current.classList.remove("header__shrink");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", headerFunc);
    return () => window.removeEventListener("scroll", headerFunc);
  }, []);

  const handleClick = (e, path) => {
    e.preventDefault();

    if (!path || !path.startsWith("#")) return;

    // Si on est sur la page d'accueil, scroll normal
    if (location.pathname === "/" || location.pathname === "") {
      const targetElement = document.querySelector(path);
      if (targetElement) {
        const targetLocation = targetElement.offsetTop;
        window.scrollTo({
          left: 0,
          top: targetLocation - 80,
          behavior: 'smooth'
        });
      }
    } else {
      // Si on est sur une autre page, redirection complète
      window.location.href = `/${path}`;
    }
  };

  const toggleMenu = ()=> menuRef.current.classList.toggle('menu__active');

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <div className="nav__wrapper">
          <div className="logo">
            <h2>E-D-I CONSEIL</h2>
          </div>

          {/* --------- navigation --------- */}
          <div className="navigation" ref={menuRef}  onClick={toggleMenu}>
            <ul className="menu">
              {nav__links.map((item, index) => (
                <li className="menu__item" key={index}>
                  {item.path.startsWith("#") ? (
                    <a
                      href={`/${item.path}`}
                      onClick={(e) => handleClick(e, item.path)}
                      className="menu__link"
                    >
                      {item.display}
                    </a>
                  ) : (
                    <Link to={item.path} className="menu__link">
                      {item.display}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* --------- light mode --------- */}
          <div className="light__mode">
            <span onClick={toggleTheme}>
              {theme === "light-theme" ? (
                <span>
                  <i className="ri-moon-line"></i>Dark
                </span>
              ) : (
                <span>
                  <i className="ri-sun-line"></i>Light
                </span>
              )}
            </span>
          </div>

          <span className="mobile__menu" onClick={toggleMenu}><i class="ri-menu-line"></i></span>


            

        </div>
      </div>
    </header>
  );
};

export default Header;