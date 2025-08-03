import React from "react";
import "../../styles/about.css";

import aboutImg from "../../images/about-us.jpg";

const chooseData = [
  {
    icon: "ri-wifi-line",
    title: "First Working process",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia sint assumenda reiciendis sit maiores facilis laudantium et non fugit debitis?",
  },
  {
    icon: "ri-team-line",
    title: "Dedicated Team",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia sint assumenda reiciendis sit maiores facilis laudantium et non fugit debitis?",
  },
  {
    icon: "ri-customer-service-2-line",
    title: "24/7 Hours support",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia sint assumenda reiciendis sit maiores facilis laudantium et non fugit debitis?",
  },
];

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <div className="about__wrapper">
          <div className="about__content">
            <h6 className="subtitle">Why choose us</h6>
            <h2>Specialist in aviding clients on</h2>
            <h2 className="highlight"> financial challenges</h2>
            <p className="description about__content-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto ratione, ullam animi explicabo saepe cumque, suscipit
              quos necessitatibus possimus recusandae molestias ipsa cupiditate
              quisquam eum quod temporibus perferendis. Dolorum, accusamus!
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
