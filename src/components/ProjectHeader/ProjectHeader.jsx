import React from 'react';
import { Calendar, DollarSign, Users, Code, Zap } from 'lucide-react';
import './ProjectHeader.css';

const ProjectHeader = ({ projectData }) => {
  return (
    <div className="project-header">
      <div className="project-header__content">
        <div className="project-header__main">
          <div className="project-header__info">
            <h2 className="project-header__title">
              Tu Proyecto: <span className="project-header__title--accent">{projectData.name}</span>
            </h2>
            <p className="project-header__description">{projectData.description}</p>
          </div>
          <button className="project-header__ai-btn">
            <Zap className="project-header__ai-icon" />
            <span>Generar Resumen con IA</span>
          </button>
        </div>

        <div className="project-header__stats">
          <div className="project-stat project-stat--blue">
            <div className="project-stat__header">
              <Calendar className="project-stat__icon" />
              <span className="project-stat__label">Estado Actual</span>
            </div>
            <p className="project-stat__value">{projectData.status}</p>
          </div>
          
          <div className="project-stat project-stat--green">
            <div className="project-stat__header">
              <DollarSign className="project-stat__icon" />
              <span className="project-stat__label">Presupuesto</span>
            </div>
            <p className="project-stat__value">{projectData.budget}</p>
          </div>
          
          <div className="project-stat project-stat--purple">
            <div className="project-stat__header">
              <Users className="project-stat__icon" />
              <span className="project-stat__label">Equipo</span>
            </div>
            <p className="project-stat__value">{projectData.team.length} miembros</p>
          </div>
          
          <div className="project-stat project-stat--orange">
            <div className="project-stat__header">
              <Code className="project-stat__icon" />
              <span className="project-stat__label">Tecnologías</span>
            </div>
            <p className="project-stat__value">{projectData.technologies.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;