import React from "react";

import "../../styles/counter.css";

const counterData = [
  {
    number: "10+",
    text: "Années d'expertise",
  },
  {
    number: "30+",
    text: "Projets EDI réalisés",
  },
  {
    number: "100%",
    text: "Clients satisfaits",
  },
];

const Counter = () => {
  return (
    <section className="counter" id="ensavoirplus">
      <div className="container">
        <div className="counter__wrapper">
          {counterData.map((item, index) => (
            <div className="counter__item" key={index}>
              <h3 className="counter__number">{item.number}</h3>
              <h4 className="counter__title">{item.text}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counter;
