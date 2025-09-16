import React from 'react';
import './RecentActivity.css';

const RecentActivity = ({ activities }) => {
  const getAvatarGradient = (avatar) => {
    const gradients = {
      'FC': 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      'AR': 'linear-gradient(135deg, #10b981, #059669)',
      'S': 'linear-gradient(135deg, #f59e0b, #d97706)',
      'FG': 'linear-gradient(135deg, #ef4444, #dc2626)',
    };
    return gradients[avatar] || 'linear-gradient(135deg, #6b7280, #4b5563)';
  };

  const getActivityIcon = (action) => {
    if (action.includes('Actualizó')) return '📝';
    if (action.includes('comentario')) return '💬';
    if (action.includes('completado')) return '✅';
    if (action.includes('creó')) return '✨';
    return '📋';
  };

  return (
    <div className="recent-activity">
      <h3 className="recent-activity__title">Actividad Reciente</h3>
      <div className="recent-activity__list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div 
              className="activity-item__avatar"
              style={{ background: getAvatarGradient(activity.avatar) }}
            >
              <span className="activity-item__avatar-text">{activity.avatar}</span>
            </div>
            <div className="activity-item__content">
              <div className="activity-item__main">
                <span className="activity-item__icon">{getActivityIcon(activity.action)}</span>
                <p className="activity-item__text">
                  <span className="activity-item__user">{activity.user}</span>{' '}
                  {activity.action}{' '}
                  <span className="activity-item__detail">"{activity.detail}"</span>
                </p>
              </div>
              <p className="activity-item__time">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="recent-activity__view-all">
        Ver toda la actividad
      </button>
    </div>
  );
};

export default RecentActivity;