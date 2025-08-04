import React from 'react'
import '../../styles/newsletter.css'

const Newsletter = () => {
  return (
    <section className="newsletter">
        <div className="container">
            <div className="newsletter__wrapper">
                <div className="newsletter__content">
                    <h6 className='subtitle'>Restons connectés</h6>
                    <h2>Recevez nos <span className='highlight'>actualités</span> et ressources EDI</h2>
                </div>

                <div className="newsletter__form">
                    <input type="email" placeholder='Votre email' />
                    <button className='secondary__btn subscribe__btn'>S’abonner</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Newsletter
