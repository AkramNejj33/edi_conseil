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
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    alert('Message envoyé avec succès !');
  };

  return (
    <section  className="contact-section">
      <div className="container">
        {/* Section Carte */}
        <div className="map-section">
          <h2 className="section-title">Notre Localisation</h2>
          <p className="subtitle">Venez nous rencontrer</p>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps?q=69+Rue+Brillat-Savarin+75013+Paris&output=embed"
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
                <p>69 Rue Brillat-Savarin, Lot 106<br />75013 Paris, France</p>
                <a
                  href="https://maps.google.com/?q=69+Rue+Brillat-Savarin+75013+Paris"
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

        <div id='contact' className="contact-content">
          <div className="contact-info">
            <h2 className="section-title">Contactez-nous</h2>
            <p className="subtitle">Besoin d’un accompagnement EDI ?</p>
            <p className="description">
              Discutons ensemble de vos projets : audit, migration, conformité, ou support technique. 
              E-D-I CONSEIL vous répond rapidement et efficacement.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <i class="ri-map-pin-line"></i>
                </div>
                <div className="contact-text">
                  <h4>Adresse</h4>
                  <p>69 Rue Brillat-Savarin, Lot 106<br />75013 Paris, France</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i class="ri-phone-line"></i>
                </div>
                <div className="contact-text">
                  <h4>Téléphone</h4>
                  <p>+33 7 72 20 87 40</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i class="ri-mail-line"></i>
                </div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <p>contact@ediconseil.net</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i class="ri-time-line"></i>
                </div>
                <div className="contact-text">
                  <h4>Horaires</h4>
                  <p>Lun - Ven : 9h00 - 18h00<br />Sam : sur rendez-vous</p>
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
