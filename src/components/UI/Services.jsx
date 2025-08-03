import React from "react";
import "../../styles/services.css";

const serviceData = [
  {
    icon: "ri-apps-line",
    title: "App Development",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure sit magnam dolorem dolores at culpa autem cum ab necessitatibus sequi!",
  },
  {
    icon: "ri-rocket-line",
    title: "Web Marketing",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure sit magnam dolorem dolores at culpa autem cum ab necessitatibus sequi!",
  },
  {
    icon: "ri-quill-pen-ai-line",
    title: "Design",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure sit magnam dolorem dolores at culpa autem cum ab necessitatibus sequi!",
  },
  {
    icon: "ri-play-circle-line",
    title: "Social Media",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure sit magnam dolorem dolores at culpa autem cum ab necessitatibus sequi!",
  },
];

export const Services = () => {
  return (
    <section id="service">
      <div className="container">
        <div className="service__top-content">
          <h6 className="subtitle">Our Services</h6>
          <h2>Save time managing your business with</h2>
          <h2 className="highlight"> our best services</h2>
        </div>

        <div className="service__item-wrapper">
          {serviceData.map((item, index) => (
            <div className="service__item" key={index}>
              <span className="service__icon">
                <i class={item.icon}></i>
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
