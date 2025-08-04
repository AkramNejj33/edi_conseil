import React from "react";
import "../../styles/services.css";

const serviceData = [
  {
    icon: "ri-search-eye-line",
    title: "Conseil & Audit EDI",
    desc: "Cartographie des flux, détection des anomalies, recommandations d'amélioration et accompagnement sur mesure.",
  },
  {
    icon: "ri-upload-cloud-line",
    title: "Migration & Intégration",
    desc: "Migration vers des solutions SaaS/cloud, refonte des flux, validation, et mise en production maîtrisée.",
  },
  {
    icon: "ri-file-code-line",
    title: "Conformité Factur-X",
    desc: "Mise en conformité avec la réforme 2024-2026, intégration PDP, Chorus Pro, PPF, Factur-X.",
  },
  {
    icon: "ri-customer-service-2-line",
    title: "Support & TMA",
    desc: "Assistance de niveau 1 à 3, supervision des flux critiques, documentation et maintenance évolutive.",
  },
];

export const Services = () => {
  return (
    <section id="services">
      <div className="container">
        <div className="service__top-content">
          <h6 className="subtitle">Nos services</h6>
          <h2>Optimisez vos échanges de données</h2>
          <h2 className="highlight">avec notre expertise EDI</h2>
        </div>

        <div className="service__item-wrapper">
          {serviceData.map((item, index) => (
            <div className="service__item" key={index}>
              <span className="service__icon">
                <i className={item.icon}></i>
              </span>
              <h3 className="service__title">{item.title}</h3>
              <p className="description">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
