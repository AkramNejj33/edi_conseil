import React, { useState } from 'react';
import { Calendar, Clock, Video, Phone, User, Mail, Building, MessageSquare, Check } from 'lucide-react';
import '../../styles/appointment.css';

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('video');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    requirements: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [viewMonth, setViewMonth] = useState(currentMonth);
  const [viewYear, setViewYear] = useState(currentYear);

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateAvailable = (date) => {
    const today = new Date();
    const checkDate = new Date(viewYear, viewMonth, date);
    return checkDate >= today && checkDate.getDay() !== 0 && checkDate.getDay() !== 6;
  };

  const handleDateSelect = (date) => {
    if (isDateAvailable(date)) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      setSelectedDate(dateStr);
      setCurrentStep(2);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentStep(3);
  };

  const handleFormSubmit = () => {
    if (formData.fullName && formData.email && formData.phone) {
      setShowConfirmation(true);
    }
  };

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

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(viewMonth, viewYear);
    const firstDay = getFirstDayOfMonth(viewMonth, viewYear);
    const days = [];

    // Ajuster pour que lundi soit le premier jour
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day-empty"></div>);
    }

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

  if (showConfirmation) {
    return (
      <section className="appointment-section">
        <div className="container">
          <div className="confirmation-container">
            <div className="confirmation-icon">
              <Check size={40} />
            </div>
            
            <h1 className="confirmation-title">Rendez-vous confirmé !</h1>
            <p className="confirmation-description">
              Votre consultation EDI a été planifiée avec succès. Vous recevrez bientôt un email de confirmation avec tous les détails.
            </p>
            
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

            <div className="confirmation-email">
              <p>Un email de confirmation a été envoyé à <strong>{formData.email}</strong></p>
              <p>Vous recevrez le lien de connexion 1 heure avant le rendez-vous.</p>
            </div>

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

  return (
    <section className="appointment-section">
      <div className="container">
        {/* Title */}
        <div className="appointment-header">
          <h1>Planifier votre consultation EDI</h1>
          <p className="description">
            Réservez un créneau pour discuter de vos besoins en intégration de données électroniques et explorer les solutions adaptées à votre entreprise.
          </p>
        </div>

        {/* Progress Indicator */}
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
          {/* Calendar Section */}
          <div className="calendar-section">
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

              {/* Calendar Navigation */}
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

              {/* Calendar Grid */}
              <div className="calendar-header">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                  <div key={day} className="day-header">{day}</div>
                ))}
              </div>
              <div className="calendar-grid">
                {renderCalendar()}
              </div>

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

            {/* Time Slots */}
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

          {/* Booking Form */}
          <div className="form-section">
            <div className="appointment-card form-card">
              <h3>Détails de la consultation</h3>

              {/* Consultation Type */}
              <div className="form-group">
                <label className="form-label">Type de consultation</label>
                <div className="consultation-types">
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

              {/* Contact Form */}
              {currentStep >= 3 && (
                <div className="contact-form">
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

                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    className="btn-primary submit-btn"
                  >
                    Confirmer le rendez-vous
                  </button>
                </div>
              )}

              {/* Summary */}
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

              {/* Policy */}
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