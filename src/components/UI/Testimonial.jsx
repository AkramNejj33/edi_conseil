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
    swipeToSlide : true ,
  };

  return (
    <section>
      <div className="container">
        <div className="slider_content_top">
          <h6 className="subtitle">Testimonials</h6>
          <h2>
            Trusted by more than{" "}
            <span className="highlight">5.000 Customers</span>
          </h2>
        </div>

        <div className="slider__wrapper">
          <Slider {...settings}>
            <div className="slider__item">
              <p className="description">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas aliquid sequi vel culpa, quam voluptates perferendis ducimus numquam dignissimos nihil? Atque nobis ullam accusantium aut sunt eius animi dicta facere obcaecati beatae impedit harum, vero cupiditate nisi voluptatem veniam alias!
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
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore molestiae eius aspernatur blanditiis eaque sunt, obcaecati saepe aut id ullam, harum, autem assumenda officia eum? Iure cumque perspiciatis deserunt molestias, incidunt vero enim rerum architecto, nobis itaque, earum recusandae consequatur.
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
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore molestiae eius aspernatur blanditiis eaque sunt, obcaecati saepe aut id ullam, harum, autem assumenda officia eum? Iure cumque perspiciatis deserunt molestias, incidunt vero enim rerum architecto, nobis itaque, earum recusandae consequatur.
              </p>
              <div className="customer__details">
                <div className="customer__img">
                  <img src={ava03} alt="Customer" />
                </div>
                <div>
                  <h5 className="customer__name">Mark ezer</h5>
                  <p className="description">Directeur fantastique, falconseil</p>
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
