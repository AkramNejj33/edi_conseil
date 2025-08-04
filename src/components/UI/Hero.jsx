import React from "react";
import "../../styles/hero.css";
import heroDarkImg from "../../images/hero-img.jpg";

import lightImg from "../../images/les-mains-avec-un-ordinateur-portable-et-la-carte-du-monde-virtuel.jpg";

const Hero = ({ theme }) => {
  return (
    <section id="accueil" className="hero__section">
      <div className="container">
        <div className="hero__wrapper">
          <div className="hero__content">
            <div>
              <h2>Nous transformons vos</h2>
              <h2>échanges de données</h2>
              <h2 className="highlight">avec expertise et agilité</h2>
            </div>
            <p className="description">
              E-D-I CONSEIL est votre expert en EDI et Middleware. Nous vous
              accompagnons dans l’audit, la migration, la mise en conformité, le
              support et la formation. Avec plus de 10 ans d’expérience, nous
              assurons la réussite de votre transformation numérique.
            </p>

            <div className="hero__btns">
              <a href="/rendez-vous">
                <button className="primary__btn">Prendre un RDV</button>
              </a>
              <a href="#ensavoirplus">
                <button className="secondary__btn">En savoir plus</button>
              </a>
            </div>
          </div>
          <div className="hero__img">
            <img
              src={theme === "light-theme" ? lightImg : heroDarkImg}
              alt="hero-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
