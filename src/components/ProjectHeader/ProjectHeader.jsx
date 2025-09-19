import React, { useState } from 'react';
import { Calendar, DollarSign, Users, Code, Zap, ChevronDown, Loader } from 'lucide-react'; // Importa un ícono de carga
import './ProjectHeader.css';

const ProjectHeader = ({ projectNames, currentProject, onProjectSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   // Estados para manejar la lógica de la IA
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Función para manejar la selección de proyecto
   const handleSelect = (projectName) => {
    onProjectSelect(projectName);
    setIsDropdownOpen(false);
  };
 // Lógica para llamar a nuestro backend
  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      // La URL de nuestro servidor backend
      const response = await fetch('http://localhost:3001/api/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Enviamos los datos del proyecto actual en el cuerpo de la petición
        body: JSON.stringify(currentProject), 
      });

      if (!response.ok) {
        throw new Error('La respuesta del servidor no fue exitosa.');
      }

      const data = await response.json();
      setSummary(data.summary); // Guardamos el resumen recibido

    } catch (err) {
      setError('No se pudo generar el resumen. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false); // Detenemos la carga, ya sea con éxito o error
    }
  };

  return (
    <div className="project-header">
      <div className="project-header__content">
        <div className="project-header__main">
          <div className="project-header__info">
            <h2 className="project-header__title">
              Tu Proyecto:
              {/* Contenedor para posicionar el dropdown correctamente */}
              <div className="project-selector-container">
                <button 
                  className="project-selector" 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Abre/cierra el dropdown
                >
                  <span className="project-selector__name">{currentProject.name}</span>
                  <ChevronDown className="project-selector__icon" />
                </button>

                {/* 4. Renderizado condicional del dropdown */}
                {isDropdownOpen && (
                  <ul className="project-dropdown">
                    {projectNames.map((name) => (
                      <li
                        key={name}
                        className="dropdown-item"
                        onClick={() => handleSelect(name)}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </h2>
            <p className="project-header__description">{currentProject.description}</p>
          </div>
           <button 
            className="project-header__ai-btn" 
            onClick={handleGenerateSummary}
            disabled={isLoading} // El botón se deshabilita mientras carga
          >
            {isLoading ? (
              <Loader className="project-header__ai-icon project-header__ai-icon--loading" />
            ) : (
              <Zap className="project-header__ai-icon" />
            )}
            <span>{isLoading ? 'Generando...' : 'Generar Resumen con IA'}</span>
          </button>
        </div>
         {summary && (
          <div className="ai-summary">
            <h4>Resumen Ejecutivo IA</h4>
            <p>{summary}</p>
          </div>
        )}
        {error && <p className="ai-error">{error}</p>}

        {/* El resto de la UI ahora usa los datos de 'currentProject' */}
        <div className="project-header__stats">
          <div className="project-stat project-stat--blue">
            <div className="project-stat__header">
              <Calendar className="project-stat__icon" />
              <span className="project-stat__label">Estado Actual</span>
            </div>
            <p className="project-stat__value">{currentProject.status}</p>
          </div>
          
          <div className="project-stat project-stat--green">
            <div className="project-stat__header">
              <DollarSign className="project-stat__icon" />
              <span className="project-stat__label">Presupuesto</span>
            </div>
            <p className="project-stat__value">{currentProject.budget}</p>
          </div>
          
          <div className="project-stat project-stat--purple">
            <div className="project-stat__header">
              <Users className="project-stat__icon" />
              <span className="project-stat__label">Equipo</span>
            </div>
            <p className="project-stat__value">{currentProject.team.length} miembros</p>
          </div>
          
          <div className="project-stat project-stat--orange">
            <div className="project-stat__header">
              <Code className="project-stat__icon" />
              <span className="project-stat__label">Tecnologías</span>
            </div>
            <p className="project-stat__value">{currentProject.technologies.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
