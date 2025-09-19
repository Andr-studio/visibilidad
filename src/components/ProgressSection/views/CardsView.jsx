import React, { useState } from 'react';
import CommentButton from '../CommentButton';
import './CardsView.css';

const CardsView = ({ milestones, onOpenComments, getCommentCount }) => {
  
  const getStatusInfo = (status) => {
    switch (status) {
      case 'completado':
        return { text: 'Completado', className: 'status-indicator--completado' };
      case 'en-progreso':
        return { text: 'En Progreso', className: 'status-indicator--en-progreso' };
      default:
        return { text: 'Pendiente', className: 'status-indicator--pendiente' };
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
                    className={`milestone__progress-fill milestone__progress-fill--${milestone.status}`}
              style={{ width: `${milestone.progress}%` }}
                  ></div>
                </div>
                <span className="milestone-card__progress-text">{milestone.progress}%</span>
              </div>
              <CommentButton 
                  milestoneId={milestone.id}
                  commentCount={getCommentCount(milestone.id)}
                  onClick={onOpenComments}
                  variant="full"
            />
            </div>
           
          </div>
        );
      })}
    </div>
  );
};

export default CardsView;
