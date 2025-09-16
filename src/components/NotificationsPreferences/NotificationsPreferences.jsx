import React, { useState } from 'react';
import { Bell, Mail, Calendar, AlertCircle } from 'lucide-react';
import './NotificationsPreferences.css';

const NotificationsPreferences = () => {
  const [preferences, setPreferences] = useState({
    emailUpdates: false,
    weeklyProgress: true,
    milestoneCompletion: true,
    importantUpdates: true,
    dailyReminders: false,
    teamMentions: true
  });

  const handleToggle = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const savePreferences = () => {
    // Aquí iría la lógica para guardar las preferencias
    console.log('Preferences saved:', preferences);
  };

  const notificationOptions = [
    {
      key: 'emailUpdates',
      label: 'Recibir actualizaciones por Email',
      description: 'Recibe resúmenes diarios por correo electrónico',
      icon: Mail,
      color: 'blue'
    },
    {
      key: 'weeklyProgress',
      label: 'Resumen semanal del progreso',
      description: 'Informe semanal del avance del proyecto',
      icon: Calendar,
      color: 'green'
    },
    {
      key: 'milestoneCompletion',
      label: 'Notificar al completar hitos',
      description: 'Alerta cuando se complete un hito importante',
      icon: AlertCircle,
      color: 'purple'
    },
    {
      key: 'importantUpdates',
      label: 'Notificar actualizaciones importantes',
      description: 'Cambios críticos en el proyecto',
      icon: Bell,
      color: 'orange'
    },
    {
      key: 'dailyReminders',
      label: 'Recordatorios diarios',
      description: 'Recordatorio de tareas pendientes',
      icon: Bell,
      color: 'red'
    },
    {
      key: 'teamMentions',
      label: 'Menciones del equipo',
      description: 'Cuando alguien te mencione en comentarios',
      icon: Mail,
      color: 'indigo'
    }
  ];

  return (
    <div className="notifications-preferences">
      <div className="notifications-preferences__header">
        <h3 className="notifications-preferences__title">Notificaciones y Preferencias</h3>
        <p className="notifications-preferences__description">
          Configura cómo quieres recibir las actualizaciones de tu proyecto.
        </p>
      </div>
      
      <div className="notifications-preferences__options">
        {notificationOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <div key={option.key} className="notification-option">
              <div className="notification-option__content">
                <div className="notification-option__icon-container">
                  <div className={`notification-option__icon notification-option__icon--${option.color}`}>
                    <IconComponent className="notification-option__icon-svg" />
                  </div>
                </div>
                <div className="notification-option__info">
                  <label className="notification-option__label">
                    {option.label}
                  </label>
                  <p className="notification-option__description">
                    {option.description}
                  </p>
                </div>
              </div>
              <div className="notification-option__toggle">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={preferences[option.key]}
                    onChange={() => handleToggle(option.key)}
                    className="toggle__input"
                  />
                  <span className="toggle__slider"></span>
                </label>
              </div>
            </div>
          );
        })}
      </div>
      
      <button 
        className="notifications-preferences__save-btn"
        onClick={savePreferences}
      >
        Guardar Preferencias
      </button>
    </div>
  );
};

export default NotificationsPreferences;