
import React from 'react'
import '../../styles/hero.css'
import heroDarkImg from '../../images/hero-img.jpg'

import lightImg from '../../images/les-mains-avec-un-ordinateur-portable-et-la-carte-du-monde-virtuel.jpg'

const Hero = ({theme}) => {
  return (
    <section id='accueil' className='hero__section'>
        <div className="container">
            <div className="hero__wrapper">
                <div className="hero__content">
                    <div>
                        <h2>We're Creating Perfect</h2>
                        <h2>Digital Products To</h2>
                        <h2 className='highlight'>Promote Your Brand</h2>                    
                    </div>
                <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, quod dicta voluptatem voluptates nobis repellat veniam eius fugiat sit molestiae, explicabo vel nesciunt. Debitis atque omnis eos. Accusantium, iste itaque.</p>    

                <div className="hero__btns">
                    <button className="primary__btn">Get Started Now</button>
                    <button className="secondary__btn">Discover More</button>
                </div>
                </div>
                <div className="hero__img">
                    <img src={theme === 'light-theme' ? lightImg : heroDarkImg} alt="hero-img" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero