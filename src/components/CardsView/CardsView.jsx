import React, { useState } from 'react';
import './CardsView.css';
import Comments from '../Comments/Comments';

const CardsView = ({ milestones, comments, onAddComment }) => {
  const [expandedComments, setExpandedComments] = useState(null);

  const toggleComments = (milestoneId) => {
    setExpandedComments(expandedComments === milestoneId ? null : milestoneId);
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed':
        return { text: 'Completado', className: 'status-indicator--completed' };
      case 'in-progress':
        return { text: 'En Progreso', className: 'status-indicator--in-progress' };
      default:
        return { text: 'Pendiente', className: 'status-indicator--pending' };
    }
  };

  return (
    <div className="cards-view">
      {milestones.map((milestone) => {
        const statusInfo = getStatusInfo(milestone.status);
        return (
          <div key={milestone.id} className="milestone-card-wrapper">
            <div className="milestone-card">
              <div className="milestone-card__header">
                <span className={`status-indicator ${statusInfo.className}`}></span>
                <h5 className="milestone-card__title">{milestone.title}</h5>
              </div>
              <p className="milestone-card__assignee">
                Responsable: <strong>{milestone.assignee}</strong>
              </p>
              <p className="milestone-card__due-date">
                Fecha Límite: <strong>{milestone.dueDate}</strong>
              </p>
              <div className="milestone-card__progress">
                <div className="milestone-card__progress-bar">
                  <div
                    className="milestone-card__progress-fill"
                    style={{ width: `${milestone.progress}%` }}
                  ></div>
                </div>
                <span className="milestone-card__progress-text">{milestone.progress}%</span>
              </div>
              <button onClick={() => toggleComments(milestone.id)} className="comment-toggle-btn">
                Comentarios ({comments[milestone.id]?.length || 0})
              </button>
            </div>
            {expandedComments === milestone.id && (
              <Comments
                milestoneId={milestone.id}
                comments={comments[milestone.id] || []}
                onAddComment={onAddComment}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CardsView;
