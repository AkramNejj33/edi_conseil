import "./Home.css";

import Hero from "../components/UI/Hero";
import Counter from "../components/UI/Counter";
import Services from "../components/UI/Services";
import About from "../components/UI/About";
import Team from "../components/UI/Team";
import Testimonial from "../components/UI/Testimonial";
import Contact from "../components/UI/Contact";



function Home({ theme }) {

  return (
    <>
      <Hero theme={theme}/>
      <Counter />
      <Services />
      <About />
      <Team />
      <Contact />
      <Testimonial />
    </>
  );
}

export default Home;
