import React from "react";
import "../../styles/about.css";

import aboutImg from "../../images/about-us.jpg";

const chooseData = [
  {
    icon: "ri-wifi-line",
    title: "Expertise technique pointue",
    desc: "Plus de 10 ans d'expérience sur les solutions EDI et Middleware : TradeXpress, OpenText, Generix, IBM Sterling, etc.",
  },
  {
    icon: "ri-team-line",
    title: "Accompagnement personnalisé",
    desc: "Nous intervenons auprès des PME, ETI et grands groupes avec des solutions adaptées à chaque contexte métier.",
  },
  {
    icon: "ri-customer-service-2-line",
    title: "Support et réactivité",
    desc: "Un support technique de niveau 1 à 3, avec astreinte, documentation claire et supervision proactive des flux critiques.",
  },
];

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <div className="about__wrapper">
          <div className="about__content">
            <h6 className="subtitle">Pourquoi nous choisir</h6>
            <h2>Spécialistes de l’intégration</h2>
            <h2 className="highlight">EDI et Middleware</h2>
            <p className="description about__content-desc">
              E-D-I CONSEIL vous accompagne dans tous vos projets d’échange de données interentreprises :
              audit, migration, conformité réglementaire, support et formation. 
              Nous sommes le partenaire de confiance pour réussir votre transformation numérique.
            </p>

            <div className="choose__item-wrapper">
              {chooseData.map((item, index) => (
                <div className="choose__us-item" key={index}>
                  <span className="choose__us-icon">
                    <i class={item.icon}></i>
                  </span>
                  <div>
                    <h4 className="choose__us-title">{item.title}</h4>
                    <p className="description">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about__img">
            <img src={aboutImg} alt="about-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
