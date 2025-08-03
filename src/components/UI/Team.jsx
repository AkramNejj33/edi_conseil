import React from "react";
import "../../styles/team.css";

import team01 from "../../images/ceo.png";

const Team = () => {
  return (
    <section>
      <div className="container">
        <div className="team__content">
          <h6 className="subtitle">À propos du consultant</h6>
          <h2>
            Rencontrez votre <span className="highlight">expert EDI</span>
          </h2>
        </div>

        <div className="ceo__wrapper">
          <div className="ceo__content">
            <h3>Mohammed NEJJARI</h3>
            <h4 className="ceo__title">Fondateur de E-D-I CONSEIL</h4>
            <p className="ceo__description">
              Spécialiste EDI expérimenté avec 10 années d'expertise dans la
              conduite de transformations digitales pour les plus grandes
              entreprises françaises. Expertise avérée en déploiement de
              projets, coordination d'équipes et rédaction de spécifications
              techniques. Maîtrise parfaite de la gestion des flux EDI de bout
              en bout et accompagnement expert des entreprises dans leurs
              parcours de digitalisation.
            </p>
            <p className="ceo__mission">
              Sa vision : "Exploiter les compétences en solutions EDI pour
              contribuer au succès organisationnel et guider les entreprises
              vers l'excellence digitale."
            </p>

            <div className="ceo__social">
              <span>
                <i className="ri-linkedin-line"></i>
              </span>
              <span>
                <i className="ri-twitter-line"></i>
              </span>
              <span>
                <i className="ri-mail-line"></i>
              </span>
            </div>
          </div>

          <div className="ceo__image">
            <div className="ceo__img">
              <img src={team01} alt="CEO E-D-I CONSEIL" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
