import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/trustus.css";
import Slider from "react-slick";

// Import des logos (vous devrez ajouter ces images dans votre dossier images)
import autodistribution from "../../images/autodistribution-logo.png";
import manutan from "../../images/manutan-logo.png";
import navilandCargo from "../../images/naviland-cargo-logo.png";
import alainAfflelou from "../../images/alain-afflelou-logo.jpg";
import ophthalmic from "../../images/ophthalmic-logo.png";
import safran from "../../images/safran-logo.png";

const TrustUs = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const clients = [
    {
      name: "Autodistribution",
      logo: autodistribution,
      alt: "Logo Autodistribution"
    },
    {
      name: "Manutan",
      logo: manutan,
      alt: "Logo Manutan"
    },
    {
      name: "Naviland Cargo",
      logo: navilandCargo,
      alt: "Logo Naviland Cargo"
    },
    {
      name: "Alain Afflelou",
      logo: alainAfflelou,
      alt: "Logo Alain Afflelou"
    },
    {
      name: "Ophthalmic",
      logo: ophthalmic,
      alt: "Logo Ophthalmic"
    },
    {
      name: "Safran",
      logo: safran,
      alt: "Logo Safran"
    }
  ];

  return (
    <section className="trustus-section">
      <div className="container">
        <div className="trustus_content_top">
          <h6 className="subtitle">Références</h6>
          <h2>
            Ils nous font <span className="highlight">confiance</span>
          </h2>
        </div>

        <div className="trustus__wrapper">
          <Slider {...settings}>
            {clients.map((client, index) => (
              <div key={index} className="trustus__item">
                <div className="client__logo">
                  <img src={client.logo} alt={client.alt} />
                </div>
                <h5 className="client__name">{client.name}</h5>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TrustUs;