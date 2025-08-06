import React, { useState } from 'react';
import { Calendar, Clock, Video, Phone, User, Mail, Building, MessageSquare, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';

import '../../styles/appointment.css';

const Appointment = () => {
  // ============ ÉTATS DE GESTION DU COMPOSANT ============
  
  // États pour la sélection de date et heure
  const [selectedDate, setSelectedDate] = useState(''); // Date sélectionnée (format YYYY-MM-DD)
  const [selectedTime, setSelectedTime] = useState(''); // Heure sélectionnée
  const [consultationType, setConsultationType] = useState('video'); // Type : 'video' ou 'phone'
  const [currentStep, setCurrentStep] = useState(1); // Étape actuelle (1, 2, ou 3)
  
  // État pour les données du formulaire - C'EST ICI QUE SONT STOCKÉES LES INFOS CLIENT
  const [formData, setFormData] = useState({
    fullName: '',     // Nom complet du client
    email: '',        // Email du client
    phone: '',        // Téléphone du client
    company: '',      // Entreprise (optionnel)
    requirements: ''  // Besoins EDI (optionnel)
  });
  
  // État pour afficher la page de confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ============ GESTION DU CALENDRIER ============
  
  // États pour la navigation dans le calendrier
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [viewMonth, setViewMonth] = useState(currentMonth); // Mois affiché dans le calendrier
  const [viewYear, setViewYear] = useState(currentYear); // Année affichée dans le calendrier

  // Noms des mois en français pour l'affichage
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  // Créneaux horaires disponibles - VOUS POUVEZ MODIFIER CES HORAIRES
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  // ============ FONCTIONS UTILITAIRES POUR LE CALENDRIER ============
  
  // Obtient le nombre de jours dans un mois donné
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Obtient le premier jour du mois (0 = dimanche, 1 = lundi, etc.)
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Vérifie si une date est disponible pour réservation
  // RÈGLES ACTUELLES : pas de weekend, pas de dates passées
  const isDateAvailable = (date) => {
    const today = new Date();
    const checkDate = new Date(viewYear, viewMonth, date);
    // Disponible si : date >= aujourd'hui ET pas weekend (dimanche=0, samedi=6)
    return checkDate >= today && checkDate.getDay() !== 0 && checkDate.getDay() !== 6;
  };

  // ============ GESTIONNAIRES D'ÉVÉNEMENTS ============
  
  // Gère la sélection d'une date dans le calendrier
  const handleDateSelect = (date) => {
    if (isDateAvailable(date)) {
      // Formate la date au format YYYY-MM-DD pour le stockage
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      setSelectedDate(dateStr);
      setCurrentStep(2); // Passe à l'étape 2 (sélection de l'heure)
    }
  };

  // Gère la sélection d'un créneau horaire
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentStep(3); // Passe à l'étape 3 (formulaire de contact)
  };

  // Gère la soumission du formulaire avec envoi d'email
  const handleFormSubmit = async () => {
    // Vérifie que les champs obligatoires sont remplis
    if (formData.fullName && formData.email && formData.phone) {
      setIsLoading(true);
      
      try {
        // Configuration EmailJS
        const serviceID = 'service_51oo08n'; // À remplacer
        const templateID = 'template_k2ly08a'; // À créer dans EmailJS
        const userID = 'r9nQCNNF8LNC5ieDS'; // À remplacer

        // Formatage de la date pour l'email
        const formattedDate = new Date(selectedDate).toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        const templateParams = {
          // Informations du rendez-vous
          appointment_date: formattedDate,
          appointment_time: selectedTime,
          consultation_type: consultationType === 'video' ? 'Visioconférence' : 'Appel téléphonique',
          duration: '45 minutes',
          
          // Informations du client
          client_name: formData.fullName,
          client_email: formData.email,
          client_phone: formData.phone,
          client_company: formData.company || 'Non spécifiée',
          client_requirements: formData.requirements || 'Aucun besoin spécifique mentionné',
          
          // Email de destination
          to_email: 'akramnejjari726@gmail.com'
        };

        await emailjs.send(serviceID, templateID, templateParams, userID);
        
        // Affiche la page de confirmation
        setShowConfirmation(true);
        
      } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
        alert('Erreur lors de la réservation. Veuillez réessayer ou nous contacter directement.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // ============ FONCTIONS D'AFFICHAGE ============
  
  // Formate la date sélectionnée pour un affichage convivial
  const formatSelectedDate = () => {
    if (!selectedDate) return '';
    const date = new Date(selectedDate);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Génère la grille du calendrier avec tous les jours du mois
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(viewMonth, viewYear);
    const firstDay = getFirstDayOfMonth(viewMonth, viewYear);
    const days = [];

    // Ajuste pour que lundi soit le premier jour (au lieu de dimanche)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    // Ajoute des cellules vides pour les jours du mois précédent
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day-empty"></div>);
    }

    // Ajoute tous les jours du mois courant
    for (let date = 1; date <= daysInMonth; date++) {
      const isAvailable = isDateAvailable(date);
      const isSelected = selectedDate === `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      
      days.push(
        <button
          key={date}
          onClick={() => handleDateSelect(date)}
          disabled={!isAvailable}
          className={`calendar-day ${
            isSelected
              ? 'calendar-day-selected'
              : isAvailable
              ? 'calendar-day-available'
              : 'calendar-day-disabled'
          }`}
        >
          {date}
        </button>
      );
    }

    return days;
  };

  // ============ AFFICHAGE DE LA PAGE DE CONFIRMATION ============
  // Cette page s'affiche après la soumission du formulaire
  
  if (showConfirmation) {
    return (
      <section className="appointment-section">
        <div className="container">
          <div className="confirmation-container">
            {/* Icône de succès */}
            <div className="confirmation-icon">
              <Check size={40} />
            </div>
            
            {/* Titre de confirmation */}
            <h1 className="confirmation-title">Rendez-vous confirmé !</h1>
            <p className="confirmation-description">
              Votre consultation EDI a été planifiée avec succès. Vous recevrez bientôt un email de confirmation avec tous les détails.
            </p>
            
            {/* Récapitulatif des détails du rendez-vous */}
            <div className="confirmation-details">
              <h3 className="details-title">
                <Calendar size={20} />
                Détails du rendez-vous
              </h3>
              <div className="details-list">
                <div className="detail-item">
                  <span className="detail-label">Date :</span>
                  <span className="detail-value">{formatSelectedDate()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Heure :</span>
                  <span className="detail-value">{selectedTime}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Type :</span>
                  <span className="detail-value">
                    {consultationType === 'video' ? <Video size={16} /> : <Phone size={16} />}
                    {consultationType === 'video' ? 'Visioconférence' : 'Appel téléphonique'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Durée :</span>
                  <span className="detail-value">45 minutes</span>
                </div>
              </div>
            </div>

            {/* Information sur l'email de confirmation */}
            <div className="confirmation-email">
              <p>Un email de confirmation a été envoyé à <strong>{formData.email}</strong></p>
              <p>Vous recevrez le lien de connexion 1 heure avant le rendez-vous.</p>
            </div>

            {/* Bouton de retour à l'accueil */}
            <button 
              onClick={() => window.location.href = '/'}
              className="btn-primary confirmation-btn"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ============ AFFICHAGE PRINCIPAL DE L'INTERFACE DE RÉSERVATION ============
  
  return (
    <section className="appointment-section">
      <div className="container">
        
        {/* ============ EN-TÊTE DE LA PAGE ============ */}
        <div className="appointment-header">
          <h1>Planifier votre consultation EDI</h1>
          <p className="description">
            Réservez un créneau pour discuter de vos besoins en intégration de données électroniques et explorer les solutions adaptées à votre entreprise.
          </p>
        </div>

        {/* ============ INDICATEUR DE PROGRESSION (3 ÉTAPES) ============ */}
        <div className="progress-container">
          <div className="progress-steps">
            {[1, 2, 3].map((step, index) => (
              <React.Fragment key={step}>
                <div className={`progress-step ${currentStep >= step ? 'progress-step-active' : ''}`}>
                  {step}
                </div>
                {index < 2 && (
                  <div className={`progress-line ${currentStep > step ? 'progress-line-active' : ''}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="appointment-content">
          
          {/* ============ SECTION CALENDRIER (COLONNE GAUCHE) ============ */}
          <div className="calendar-section">
            
            {/* Carte principale du calendrier */}
            <div className="appointment-card">
              <div className="card-header">
                <h2>
                  <Calendar size={28} />
                  Choisir une date
                </h2>
                <div className="timezone">
                  Fuseau horaire : UTC+1 (Paris)
                </div>
              </div>

              {/* Navigation entre les mois */}
              <div className="calendar-nav">
                <button
                  onClick={() => {
                    if (viewMonth === 0) {
                      setViewMonth(11);
                      setViewYear(viewYear - 1);
                    } else {
                      setViewMonth(viewMonth - 1);
                    }
                  }}
                  className="nav-btn"
                >
                  ←
                </button>
                <h3 className="month-title">
                  {monthNames[viewMonth]} {viewYear}
                </h3>
                <button
                  onClick={() => {
                    if (viewMonth === 11) {
                      setViewMonth(0);
                      setViewYear(viewYear + 1);
                    } else {
                      setViewMonth(viewMonth + 1);
                    }
                  }}
                  className="nav-btn"
                >
                  →
                </button>
              </div>

              {/* En-têtes des jours de la semaine */}
              <div className="calendar-header">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                  <div key={day} className="day-header">{day}</div>
                ))}
              </div>
              
              {/* Grille du calendrier avec tous les jours */}
              <div className="calendar-grid">
                {renderCalendar()}
              </div>

              {/* Légende pour expliquer les couleurs */}
              <div className="calendar-legend">
                <div className="legend-item">
                  <div className="legend-color legend-available"></div>
                  Disponible
                </div>
                <div className="legend-item">
                  <div className="legend-color legend-unavailable"></div>
                  Indisponible
                </div>
              </div>
            </div>

            {/* ============ SECTION CRÉNEAUX HORAIRES (ÉTAPE 2) ============ */}
            {/* Cette section n'apparaît que si une date est sélectionnée */}
            {selectedDate && (
              <div className="appointment-card timeslots-card">
                <h3 className="timeslots-title">
                  <Clock size={24} />
                  Créneaux disponibles - {formatSelectedDate()}
                </h3>
                <div className="timeslots-grid">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`timeslot ${selectedTime === time ? 'timeslot-selected' : ''}`}
                    >
                      <div className="timeslot-time">{time}</div>
                      <div className="timeslot-duration">45 min</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ============ SECTION FORMULAIRE (COLONNE DROITE) ============ */}
          <div className="form-section">
            <div className="appointment-card form-card">
              <h3>Détails de la consultation</h3>

              {/* ============ CHOIX DU TYPE DE CONSULTATION ============ */}
              <div className="form-group">
                <label className="form-label">Type de consultation</label>
                <div className="consultation-types">
                  {/* Option Visioconférence */}
                  <label className="consultation-type">
                    <input
                      type="radio"
                      name="consultationType"
                      value="video"
                      checked={consultationType === 'video'}
                      onChange={(e) => setConsultationType(e.target.value)}
                    />
                    <div className="consultation-option">
                      <Video size={20} />
                      <span>Visioconférence</span>
                    </div>
                  </label>
                  {/* Option Téléphone */}
                  <label className="consultation-type">
                    <input
                      type="radio"
                      name="consultationType"
                      value="phone"
                      checked={consultationType === 'phone'}
                      onChange={(e) => setConsultationType(e.target.value)}
                    />
                    <div className="consultation-option">
                      <Phone size={20} />
                      <span>Appel téléphonique</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* ============ FORMULAIRE DE CONTACT (ÉTAPE 3) ============ */}
              {/* Ce formulaire n'apparaît qu'à l'étape 3 (après sélection date + heure) */}
              {currentStep >= 3 && (
                <div className="contact-form">
                  
                  {/* Champ Nom complet (OBLIGATOIRE) */}
                  <div className="form-group">
                    <label className="form-label">
                      <User size={16} />
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="form-input"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  {/* Champ Email (OBLIGATOIRE) */}
                  <div className="form-group">
                    <label className="form-label">
                      <Mail size={16} />
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                      placeholder="votre@email.com"
                    />
                  </div>

                  {/* Champ Téléphone (OBLIGATOIRE) */}
                  <div className="form-group">
                    <label className="form-label">
                      <Phone size={16} />
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>

                  {/* Champ Entreprise (OPTIONNEL) */}
                  <div className="form-group">
                    <label className="form-label">
                      <Building size={16} />
                      Entreprise
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="form-input"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  {/* Champ Besoins EDI (OPTIONNEL) */}
                  <div className="form-group">
                    <label className="form-label">
                      <MessageSquare size={16} />
                      Besoins EDI
                    </label>
                    <textarea
                      rows={4}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      className="form-textarea"
                      placeholder="Décrivez brièvement vos besoins en EDI..."
                      maxLength={300}
                    />
                    <div className="character-count">
                      {formData.requirements.length}/300 caractères
                    </div>
                  </div>

                  {/* Bouton de soumission du formulaire */}
                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    className="btn-primary submit-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Réservation en cours...' : 'Confirmer le rendez-vous'}
                  </button>
                </div>
              )}

              {/* ============ RÉCAPITULATIF DU RENDEZ-VOUS ============ */}
              {/* Affiché dès qu'une date et heure sont sélectionnées */}
              {selectedDate && selectedTime && (
                <div className="appointment-summary">
                  <h4>Récapitulatif</h4>
                  <div className="summary-details">
                    <div className="summary-item">
                      <span className="summary-label">Date :</span>
                      <span className="summary-value">{formatSelectedDate()}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Heure :</span>
                      <span className="summary-value">{selectedTime}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Durée :</span>
                      <span className="summary-value">45 minutes</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Type :</span>
                      <span className="summary-value">
                        {consultationType === 'video' ? 'Visioconférence' : 'Téléphone'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ============ POLITIQUE D'ANNULATION/REPROGRAMMATION ============ */}
              <div className="appointment-policy">
                <p>
                  <strong>Reprogrammation :</strong> Possible jusqu'à 24h avant le RDV
                </p>
                <p>
                  <strong>Annulation :</strong> Gratuite jusqu'à 2h avant le RDV
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;