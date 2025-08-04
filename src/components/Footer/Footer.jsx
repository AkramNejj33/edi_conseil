import React from "react";
import "./footer.css";

const quickLinks01 = [
  {
    path: "#services",
    display: "Audit & Conseil",
  },
  {
    path: "#services",
    display: "Migration EDI",
  },
  {
    path: "#services",
    display: "Formation",
  },
];

const quickLinks02 = [
  {
    path: "#services",
    display: "Support & TMA",
  },
  {
    path: "#blog",
    display: "Actualités EDI",
  },
  {
    path: "#resources",
    display: "Ressources",
  },
];

const quickLinks03 = [
  {
    path: "#about",
    display: "À propos",
  },
  {
    path: "#careers",
    display: "Carrières",
  },
  {
    path: "#contact",
    display: "Contact",
  },
];

const Footer = () => {

  const date = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__logo">
            <h2>E-D-I CONSEIL</h2>
            <p className="description">L'expertise EDI à votre service</p>

            <p className="small__text description">
              Cabinet de conseil spécialisé en EDI et Middleware. Nous accompagnons votre transformation numérique grâce à une expertise pointue et un accompagnement personnalisé.
            </p>
          </div>

          <div className="footer__quick-links">
            <h3 className="quick__links-title">Solutions</h3>
            <ul className="quick__links">
              {quickLinks01.map((item, index) => (
                <li className="quick__links-item" key={index}>
                  <a href={item.path}>{item.display}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__quick-links">
            <h3 className="quick__links-title">Support</h3>
            <ul className="quick__links">
              {quickLinks02.map((item, index) => (
                <li className="quick__links-item" key={index}>
                  <a href={item.path}>{item.display}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__quick-links">
            <h3 className="quick__links-title">Entreprise</h3>
            <ul className="quick__links">
              {quickLinks03.map((item, index) => (
                <li className="quick__links-item" key={index}>
                  <a href={item.path}>{item.display}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="copyright">Copyright {date} , développé par Mohammed Akram Nejjari. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
