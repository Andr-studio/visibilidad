import React, { useState } from 'react';
import { ChevronDown, FileText, BarChart3, Zap } from 'lucide-react';
import './ProgressSection.css';

const ProgressSection = ({ progress, milestones }) => {
  const [selectedView, setSelectedView] = useState('detailed');
  const [selectedFormat, setSelectedFormat] = useState('percentage');
  const [expandedMilestone, setExpandedMilestone] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <div className="milestone-status milestone-status--completed"></div>;
      case 'in-progress':
        return (
          <div className="milestone-status milestone-status--progress">
            <Zap className="milestone-status__icon" />
          </div>
        );
      default:
        return <div className="milestone-status milestone-status--pending"></div>;
    }
  };

  const toggleMilestone = (id) => {
    setExpandedMilestone(expandedMilestone === id ? null : id);
  };

  return (
    <div className="progress-section">
      <div className="progress-section__header">
        <h3 className="progress-section__title">Progreso General de Hitos</h3>
        <div className="progress-section__controls">
          <div className="progress-control">
            <label htmlFor="view-select" className="progress-control__label">Vista:</label>
            <select
              id="view-select"
              className="progress-control__select"
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
            >
              <option value="detailed">Lista Detallada</option>
              <option value="kanban">Kanban</option>
            </select>
          </div>
          
          <div className="progress-control">
            <label className="progress-control__label">Formato:</label>
            <select 
              className="progress-control__select"
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
            >
              <option value="percentage">Porcentaje</option>
              <option value="fraction">Fracción</option>
            </select>
          </div>
          
          <div className="progress-section__actions">
            <button className="progress-btn progress-btn--primary">
              Actualizar
            </button>
            <button className="progress-btn progress-btn--secondary">
              <FileText className="progress-btn__icon" />
              <span>PDF</span>
            </button>
            <button className="progress-btn progress-btn--secondary">
              <BarChart3 className="progress-btn__icon" />
              <span>CSV</span>
            </button>
          </div>
        </div>
      </div>

      <div className="overall-progress">
        <div className="overall-progress__header">
          <span className="overall-progress__label">Progreso Total</span>
          <span className="overall-progress__value">{progress}% Completado</span>
        </div>
        <div className="overall-progress__bar">
          <div 
            className="overall-progress__fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="milestones">
        <h4 className="milestones__title">Hitos Clave</h4>

        {selectedView === 'detailed' && (
          <div className="milestones__list">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className={`milestone ${expandedMilestone === milestone.id ? 'milestone--expanded' : ''}`}
              >
                <div
                  className="milestone__header"
                  onClick={() => toggleMilestone(milestone.id)}
                >
                  <div className="milestone__main">
                    <div className="milestone__status-container">
                      {getStatusIcon(milestone.status)}
                    </div>
                    <div className="milestone__info">
                      <h5 className="milestone__title">{milestone.title}</h5>
                      <p className="milestone__progress">Progreso: {milestone.progress}%</p>
                    </div>
                  </div>
                  <div className="milestone__meta">
                    <div className="milestone__assignee">
                      <p className="milestone__assignee-name">{milestone.assignee}</p>
                      <p className="milestone__due-date">{milestone.dueDate}</p>
                    </div>
                    <ChevronDown
                      className={`milestone__chevron ${
                        expandedMilestone === milestone.id ? 'milestone__chevron--rotated' : ''
                      }`}
                    />
                  </div>
                </div>

                <div className="milestone__progress-bar">
                  <div
                    className={`milestone__progress-fill milestone__progress-fill--${milestone.status}`}
                    style={{ width: `${milestone.progress}%` }}
                  ></div>
                </div>

                {expandedMilestone === milestone.id && (
                  <div className="milestone__details">
                    <div className="milestone__detail-content">
                      <p className="milestone__detail-item">
                        <strong>Estado:</strong> {
                          milestone.status === 'completed' ? 'Completado' :
                          milestone.status === 'in-progress' ? 'En Progreso' :
                          'Pendiente'
                        }
                      </p>
                      <p className="milestone__detail-item">
                        <strong>Fecha límite:</strong> {milestone.dueDate}
                      </p>
                      <p className="milestone__detail-item">
                        <strong>Responsable:</strong> {milestone.assignee}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedView === 'kanban' && (
          <div className="kanban-view">
            {['pending', 'in-progress', 'completed'].map(status => (
              <div key={status} className="kanban-column">
                <h5 className="kanban-column__title">{
                  status === 'pending' ? 'Pendiente' :
                  status === 'in-progress' ? 'En Progreso' :
                  'Completado'
                }</h5>
                <div className="kanban-column__cards">
                  {milestones
                    .filter(m => m.status === status)
                    .map(milestone => (
                      <div key={milestone.id} className="kanban-card">
                        <h6 className="kanban-card__title">{milestone.title}</h6>
                        <p className="kanban-card__assignee">{milestone.assignee}</p>
                        <div className="kanban-card__progress-bar">
                          <div
                            className="kanban-card__progress-fill"
                            style={{ width: `${milestone.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ProgressSection;