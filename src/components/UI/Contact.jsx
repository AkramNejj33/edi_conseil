import React, { useState } from 'react';
import '../../styles/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Traitement du formulaire ici
    console.log('Form submitted:', formData);
    // Reset du formulaire
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    alert('Message envoyé avec succès !');
  };

  return (
    <section id='contact'  className="contact-section">
      <div className="container">
        {/* Section Carte */}
        <div className="map-section">
          <h2 className="section-title">Notre Localisation</h2>
          <p className="subtitle">Trouvez-nous facilement</p>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937604!2d2.292292615674939!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1234567890123"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Notre localisation"
            ></iframe>
            <div className="map-overlay">
              <div className="map-info">
                <h3>Visitez notre bureau</h3>
                <p>123 Rue de l'Innovation<br />75001 Paris, France</p>
                <a 
                  href="https://maps.google.com/?q=123+Rue+de+l'Innovation+75001+Paris+France" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-map"
                >
                  <i className="fas fa-directions"></i>
                  Obtenir l'itinéraire
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h2 className="section-title">Contactez-nous</h2>
            <p className="subtitle">Prêt à démarrer votre projet ?</p>
            <p className="description">
              Nous sommes là pour vous aider à concrétiser vos idées. 
              N'hésitez pas à nous contacter pour discuter de votre projet 
              ou pour toute question.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <i class="ri-map-pin-line"></i>

                </div>
                <div className="contact-text">
                  <h4>Adresse</h4>
                  <p>123 Rue de l'Innovation<br />75001 Paris, France</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <i class="ri-phone-line"></i>
                </div>
                <div className="contact-text">
                  <h4>Téléphone</h4>
                  <p>+33 1 23 45 67 89</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <i class="ri-mail-line"></i>
                </div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <p>contact@votreentreprise.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <i class="ri-time-line"></i>
                </div>
                <div className="contact-text">
                  <h4>Horaires</h4>
                  <p>Lun - Ven: 9h00 - 18h00<br />Sam: 9h00 - 12h00</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Votre email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Sujet"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Votre message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn-primary">
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;