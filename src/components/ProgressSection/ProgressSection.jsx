import React, { useState } from 'react';
import Papa from 'papaparse';
import { FileText, BarChart3 } from 'lucide-react';
import './ProgressSection.css';
import './CommentSystem.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Importar los componentes de vista
import DetailedView from './views/DetailedView';
import KanbanView from './views/KanbanView';
import CalendarView from './views/CalendarView';
import CommentModal from './CommentModal';
import CardsView from './views/CardsView';
import ProgressBarView from './views/ProgressBarView';
import TableView from './views/TableView';

// Función para contar comentarios y sus respuestas de forma recursiva
const countTotalComments = (comments = []) => {
  let count = 0;
  for (const comment of comments) {
    count++; // Suma el comentario principal
    if (comment.replies && comment.replies.length > 0) {
      count += countTotalComments(comment.replies); // Suma las respuestas
    }
  }
  return count;
};

const ProgressSection = ({ progress, milestones, projectName }) => {
  const [selectedView, setSelectedView] = useState('detailed');
  const [commentModal, setCommentModal] = useState({
    isOpen: false,
    milestoneId: null,
    milestoneTitle: ''
  });
  
  // Estado centralizado para TODOS los comentarios
  const [allComments, setAllComments] = useState({
    // La clave es el milestoneId
    'm1': [
      {
        id: 1,
        author: 'María García',
        avatar: 'MG',
        content: 'Este hito está progresando bien, pero necesitamos revisar los recursos asignados.',
        timestamp: '2024-01-15T10:30:00Z',
        replies: [
          {
            id: 2,
            parentId: 1,
            author: 'Carlos López',
            avatar: 'CL',
            content: 'Estoy de acuerdo. Los recursos actuales podrían ser insuficientes.',
            timestamp: '2024-01-15T14:20:00Z',
            replies: []
          }
        ]
      },
      {
        id: 3,
        author: 'Ana Rodríguez',
        avatar: 'AR',
        content: '¿Hay algún impedimento específico que debamos abordar?',
        timestamp: '2024-01-16T09:15:00Z',
        replies: []
      }
    ],
    'm2': [
      {
        id: 4,
        author: 'Andrés Rivera',
        avatar: 'AR',
        content: 'Este hito necesita atención urgente. Estamos un poco atrasados.',
        timestamp: '2025-09-18T12:00:00Z',
        replies: []
      }
    ],
    'm3': [
      {
        id: 5,
        author: 'Sofía Mendoza',
        avatar: 'SM',
        content: '¡Excelente trabajo! Este hito está completado antes de tiempo.',
        timestamp: '2025-09-17T16:30:00Z',
        replies: []
      }
    ]
  });
  
  // Configuración de vistas disponibles
  const viewConfig = {
    detailed: {
      label: 'Lista Detallada',
      component: DetailedView
    },
    kanban: {
      label: 'Kanban',
      component: KanbanView
    },
    calendar: {
      label: 'Vista Calendario',
      component: CalendarView
    },
    cards: {
      label: 'Vista de Tarjetas',
      component: CardsView
    },
    progressBar: {
      label: 'Barra de Progreso',
      component: ProgressBarView
    },
    table: {
      label: 'Tabla',
      component: TableView
    }
  };

  const handleOpenComments = (milestoneId) => {
    const milestone = milestones.find(m => m.id === milestoneId);
    if (milestone) {
      setCommentModal({
        isOpen: true,
        milestoneId: milestoneId,
        milestoneTitle: milestone.title
      });
    }
  };

  const handleCloseComments = () => {
    setCommentModal({
      isOpen: false,
      milestoneId: null,
      milestoneTitle: ''
    });
  };

  const handleDownloadCSV = () => {
    const dataForCSV = milestones.map(m => ({
      'Hito': m.title,
      'Responsable': m.assignee,
      'Fecha Límite': m.dueDate,
      'Estado': {
        'completed': 'Completado',
        'in-progress': 'En Progreso',
        'pending': 'Pendiente'
      }[m.status],
      'Progreso (%)': m.progress
    }));

    const csv = Papa.unparse(dataForCSV);
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'reporte-hitos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(`Reporte de Progreso: ${projectName}`, 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Progreso General del Proyecto: ${progress}% Completado`, 14, 30);

    const tableColumn = ['Hito', 'Responsable', 'Fecha Límite', 'Estado', 'Progreso (%)'];
    const tableRows = [];

    milestones.forEach(milestone => {
      const milestoneData = [
        milestone.title,
        milestone.assignee,
        milestone.dueDate,
        {
          'completed': 'Completado',
          'in-progress': 'En Progreso',
          'pending': 'Pendiente'
        }[milestone.status],
        `${milestone.progress}%`
      ];
      tableRows.push(milestoneData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    doc.save('reporte-progreso.pdf');
  };

  // Renderizar la vista seleccionada
  const renderSelectedView = () => {
    const ViewComponent = viewConfig[selectedView]?.component;
    if (!ViewComponent) return null;
    
    return <ViewComponent 
      milestones={milestones} 
      onOpenComments={handleOpenComments}
      allComments={allComments}
      getCommentCount={(milestoneId) => countTotalComments(allComments[milestoneId])}
    />;
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
              {Object.entries(viewConfig).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="progress-section__actions">
            <button className="progress-btn progress-btn--secondary" onClick={handleDownloadPDF}>
              <FileText className="progress-btn__icon" />
              <span>PDF</span>
            </button>
            <button className="progress-btn progress-btn--secondary" onClick={handleDownloadCSV}>
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
        {renderSelectedView()}
      </div>

      <CommentModal
        isOpen={commentModal.isOpen}
        onClose={handleCloseComments}
        milestoneId={commentModal.milestoneId}
        milestoneTitle={commentModal.milestoneTitle}
        comments={allComments[commentModal.milestoneId] || []} 
        setComments={(newCommentsOrUpdater) => {
          setAllComments(prev => ({
            ...prev,
            [commentModal.milestoneId]: typeof newCommentsOrUpdater === 'function' 
              ? newCommentsOrUpdater(prev[commentModal.milestoneId] || [])
              : newCommentsOrUpdater
          }));
        }}
      />
    </div>
  );
};

export default ProgressSection;