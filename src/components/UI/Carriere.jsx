import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Send, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Upload,
  CheckCircle,
  Building,
  GraduationCap,
  Star,
  Calendar
} from 'lucide-react';

import '../../styles/carriere.css';

const Carriere = () => {
  // ============ ÉTATS DE GESTION DU COMPOSANT ============
  
  // État pour le formulaire de candidature
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    education: '',
    motivation: '',
    availability: ''
  });
  
  // État pour la gestion des fichiers
  const [files, setFiles] = useState({
    cv: null,
    coverLetter: null,
    portfolio: null
  });
  
  // État pour l'affichage des messages
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // ============ DONNÉES DES POSTES DISPONIBLES ============
  
  const availablePositions = [
    {
      id: 1,
      title: "Consultant Junior EDI",
      type: "CDI",
      location: "Paris",
      startDate: "2026",
      experience: "0-2 ans",
      description: "Accompagner le développement des missions clients sur la partie mapping, documentation et support technique.",
      requirements: [
        "Formation en informatique ou équivalent",
        "Connaissances de base en EDI ou volonté d'apprendre",
        "Capacités d'analyse et de résolution de problèmes",
        "Excellentes compétences en communication",
        "Autonomie et esprit d'équipe"
      ],
      responsibilities: [
        "Réalisation de mappings EDI",
        "Rédaction de documentation technique",
        "Support technique aux clients",
        "Participation aux projets d'intégration",
        "Formation continue sur les standards EDI"
      ]
    }
  ];

  // ============ AVANTAGES DE L'ENTREPRISE ============
  
  const companyBenefits = [
    {
      icon: <GraduationCap size={24} />,
      title: "Formation Continue",
      description: "Programmes de formation réguliers sur les dernières technologies EDI"
    },
    {
      icon: <Users size={24} />,
      title: "Équipe Dynamique",
      description: "Rejoignez une équipe passionnée et expérimentée"
    },
    {
      icon: <Star size={24} />,
      title: "Projets Innovants",
      description: "Travaillez sur des projets variés avec des clients de renom"
    }
  ];

  // ============ GESTIONNAIRES D'ÉVÉNEMENTS ============
  
  // Gestion de la saisie des champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Efface l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Gestion de l'upload des fichiers
  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      // Vérification de la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [fileType]: 'Le fichier ne doit pas dépasser 5MB'
        }));
        return;
      }
      
      // Vérification du type de fichier
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          [fileType]: 'Seuls les fichiers PDF et Word sont acceptés'
        }));
        return;
      }
      
      setFiles(prev => ({
        ...prev,
        [fileType]: file
      }));
      
      // Efface l'erreur du fichier
      if (errors[fileType]) {
        setErrors(prev => ({
          ...prev,
          [fileType]: ''
        }));
      }
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Le nom complet est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formData.position.trim()) newErrors.position = 'Le poste souhaité est requis';
    if (!formData.motivation.trim()) newErrors.motivation = 'La lettre de motivation est requise';
    if (!files.cv) newErrors.cv = 'Le CV est requis';
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // ⚠️⚠️⚠️ POINT IMPORTANT : ICI IL FAUDRAIT ENVOYER LES DONNÉES AU BACKEND ⚠️⚠️⚠️
      
      const candidatureData = {
        // Informations personnelles
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        experience: formData.experience,
        education: formData.education,
        motivation: formData.motivation,
        availability: formData.availability,
        
        // Fichiers (à traiter avec FormData pour l'upload)
        cv: files.cv,
        coverLetter: files.coverLetter,
        portfolio: files.portfolio,
        
        // Métadonnées
        applicationDate: new Date().toISOString(),
        status: 'En attente'
      };
      
      // EXEMPLE D'APPEL API À AJOUTER :
      /*
      const formDataToSend = new FormData();
      Object.keys(candidatureData).forEach(key => {
        if (candidatureData[key] !== null && candidatureData[key] !== '') {
          formDataToSend.append(key, candidatureData[key]);
        }
      });
      
      fetch('/api/candidatures', {
        method: 'POST',
        body: formDataToSend
      })
      .then(response => response.json())
      .then(data => {
        console.log('Candidature envoyée:', data);
        setShowSuccess(true);
        // Reset du formulaire
        setFormData({
          fullName: '', email: '', phone: '', position: '',
          experience: '', education: '', motivation: '', availability: ''
        });
        setFiles({ cv: null, coverLetter: null, portfolio: null });
      })
      .catch(error => {
        console.error('Erreur lors de l\'envoi:', error);
      });
      */
      
      // Pour l'instant, on affiche juste le succès
      setShowSuccess(true);
      
      // Reset du formulaire après 3 secondes
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          fullName: '', email: '', phone: '', position: '',
          experience: '', education: '', motivation: '', availability: ''
        });
        setFiles({ cv: null, coverLetter: null, portfolio: null });
      }, 3000);
    }
  };

  // ============ AFFICHAGE PRINCIPAL ============
  
  return (
    <section className="carriere-section">
      <div className="container">
        
        {/* ============ EN-TÊTE DE LA PAGE ============ */}
        <div className="carriere-header">
          <h1>Rejoignez notre équipe</h1>
          <p className="description">
            Découvrez les opportunités de carrière chez EDI Consulting et participez à l'avenir 
            de l'intégration des données électroniques.
          </p>
        </div>

        {/* ============ MESSAGE DE SUCCÈS ============ */}
        {showSuccess && (
          <div className="success-message">
            <CheckCircle size={24} />
            <div>
              <h3>Candidature envoyée avec succès !</h3>
              <p>Nous avons bien reçu votre candidature. Notre équipe RH vous contactera sous peu.</p>
            </div>
          </div>
        )}

        <div className="carriere-content">
          
          {/* ============ SECTION POSTES DISPONIBLES ============ */}
          <div className="positions-section">
            <h2>
              <Briefcase size={28} />
              Postes disponibles
            </h2>
            
            {availablePositions.map((position) => (
              <div key={position.id} className="position-card">
                <div className="position-header">
                  <div className="position-info">
                    <h3>{position.title}</h3>
                    <div className="position-meta">
                      <span className="position-type">{position.type}</span>
                      <span className="position-location">
                        <MapPin size={16} />
                        {position.location}
                      </span>
                      <span className="position-date">
                        <Calendar size={16} />
                        Début {position.startDate}
                      </span>
                      <span className="position-experience">
                        <Clock size={16} />
                        {position.experience}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="position-content">
                  <div className="position-description">
                    <h4>Description du poste</h4>
                    <p>{position.description}</p>
                  </div>
                  
                  <div className="position-details">
                    <div className="requirements">
                      <h4>Profil recherché</h4>
                      <ul>
                        {position.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="responsibilities">
                      <h4>Missions principales</h4>
                      <ul>
                        {position.responsibilities.map((resp, index) => (
                          <li key={index}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ============ SECTION AVANTAGES ============ */}
          <div className="benefits-section">
            <h2>Pourquoi nous rejoindre ?</h2>
            <div className="benefits-grid">
              {companyBenefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <div className="benefit-icon">
                    {benefit.icon}
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ============ FORMULAIRE DE CANDIDATURE ============ */}
          <div className="application-section">
            <div className="application-header">
              <h2>
                <Send size={28} />
                Postulez maintenant
              </h2>
              <p>Remplissez le formulaire ci-dessous pour nous faire parvenir votre candidature.</p>
            </div>

            <form onSubmit={handleSubmit} className="application-form">
              
              {/* ============ INFORMATIONS PERSONNELLES ============ */}
              <div className="form-section">
                <h3>Informations personnelles</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <User size={16} />
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`form-input ${errors.fullName ? 'error' : ''}`}
                      placeholder="Votre nom complet"
                    />
                    {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">
                      <Mail size={16} />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="votre@email.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <Phone size={16} />
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="+33 1 23 45 67 89"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">
                      <Briefcase size={16} />
                      Poste souhaité *
                    </label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className={`form-select ${errors.position ? 'error' : ''}`}
                    >
                      <option value="">Sélectionnez un poste</option>
                      {availablePositions.map((pos) => (
                        <option key={pos.id} value={pos.title}>{pos.title}</option>
                      ))}
                    </select>
                    {errors.position && <span className="error-message">{errors.position}</span>}
                  </div>
                </div>
              </div>

              {/* ============ EXPÉRIENCE ET FORMATION ============ */}
              <div className="form-section">
                <h3>Expérience et formation</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <Clock size={16} />
                      Années d'expérience
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="0-1">Débutant (0-1 an)</option>
                      <option value="1-3">Junior (1-3 ans)</option>
                      <option value="3-5">Confirmé (3-5 ans)</option>
                      <option value="5+">Senior (5+ ans)</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">
                      <GraduationCap size={16} />
                      Niveau d'études
                    </label>
                    <select
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="bac+2">Bac+2</option>
                      <option value="bac+3">Bac+3</option>
                      <option value="bac+5">Bac+5</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={16} />
                    Disponibilité
                  </label>
                  <input
                    type="text"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Ex: Immédiate, Dans 1 mois, etc."
                  />
                </div>
              </div>

              {/* ============ UPLOAD DE FICHIERS ============ */}
              <div className="form-section">
                <h3>Documents</h3>
                
                <div className="upload-grid">
                  <div className="upload-group">
                    <label className="upload-label">
                      <Upload size={20} />
                      CV * (PDF, Word - Max 5MB)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, 'cv')}
                      className="upload-input"
                    />
                    {files.cv && (
                      <div className="file-info">
                        <FileText size={16} />
                        <span>{files.cv.name}</span>
                      </div>
                    )}
                    {errors.cv && <span className="error-message">{errors.cv}</span>}
                  </div>
                  
                  <div className="upload-group">
                    <label className="upload-label">
                      <Upload size={20} />
                      Lettre de motivation (Optionnel)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, 'coverLetter')}
                      className="upload-input"
                    />
                    {files.coverLetter && (
                      <div className="file-info">
                        <FileText size={16} />
                        <span>{files.coverLetter.name}</span>
                      </div>
                    )}
                    {errors.coverLetter && <span className="error-message">{errors.coverLetter}</span>}
                  </div>
                  
                  <div className="upload-group">
                    <label className="upload-label">
                      <Upload size={20} />
                      Portfolio (Optionnel)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, 'portfolio')}
                      className="upload-input"
                    />
                    {files.portfolio && (
                      <div className="file-info">
                        <FileText size={16} />
                        <span>{files.portfolio.name}</span>
                      </div>
                    )}
                    {errors.portfolio && <span className="error-message">{errors.portfolio}</span>}
                  </div>
                </div>
              </div>

              {/* ============ LETTRE DE MOTIVATION ============ */}
              <div className="form-section">
                <h3>Lettre de motivation</h3>
                <div className="form-group">
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    className={`form-textarea ${errors.motivation ? 'error' : ''}`}
                    placeholder="Parlez-nous de votre motivation à rejoindre EDI Consulting..."
                    rows={6}
                    maxLength={1000}
                  />
                  <div className="character-count">
                    {formData.motivation.length}/1000 caractères
                  </div>
                  {errors.motivation && <span className="error-message">{errors.motivation}</span>}
                </div>
              </div>

              {/* ============ BOUTON DE SOUMISSION ============ */}
              <div className="form-submit">
                <button type="submit" className="btn-primary submit-btn">
                  <Send size={20} />
                  Envoyer ma candidature
                </button>
                <p className="form-note">
                  * Champs obligatoires. Vos données personnelles sont traitées de manière confidentielle.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carriere;