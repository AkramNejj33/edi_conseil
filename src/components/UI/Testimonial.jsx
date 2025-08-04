import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../../styles/testimonial.css";

import Slider from "react-slick";
import ava01 from "../../images/ava-1.jpg";
import ava02 from "../../images/ava-2.jpg";
import ava03 from "../../images/ava-3.jpg";

const Testimonial = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  return (
    <section>
      <div className="container">
        <div className="slider_content_top">
          <h6 className="subtitle">Témoignages</h6>
          <h2>
            Ils font confiance à{" "}
            <span className="highlight">E-D-I CONSEIL</span>
          </h2>
        </div>

        <div className="slider__wrapper">
          <Slider {...settings}>
            <div className="slider__item">
              <p className="description">
                E-D-I CONSEIL nous a permis de sécuriser notre migration EDI en un temps record. Leur expertise sur TradeXpress et OpenText a été décisive. Très professionnel et toujours à l'écoute.
              </p>
              <div className="customer__details">
                <div className="customer__img">
                  <img src={ava01} alt="Customer" />
                </div>
                <div>
                  <h5 className="customer__name">Claire Martin</h5>
                  <p className="description">Responsable SI, LogiPlus</p>
                </div>
              </div>
            </div>

            <div className="slider__item">
              <p className="description">
                Grâce à l’intervention de M. Nejjari, nous avons pu anticiper les exigences Factur-X et assurer notre conformité réglementaire. Une approche claire, structurée et efficace.
              </p>
              <div className="customer__details">
                <div className="customer__img">
                  <img src={ava02} alt="Customer" />
                </div>
                <div>
                  <h5 className="customer__name">Jean Dupont</h5>
                  <p className="description">Directeur Logistique, TransEDI</p>
                </div>
              </div>
            </div>

            <div className="slider__item">
              <p className="description">
                L’équipe a bénéficié d’une formation complète sur les flux EDI, avec cas pratiques et montée en compétence rapide. Un vrai plus pour notre autonomie opérationnelle.
              </p>
              <div className="customer__details">
                <div className="customer__img">
                  <img src={ava03} alt="Customer" />
                </div>
                <div>
                  <h5 className="customer__name">Marc Esser</h5>
                  <p className="description">Responsable Applicatif, Falconseil</p>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
