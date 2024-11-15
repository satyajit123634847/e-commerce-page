import React from 'react';
import { Project } from '../../redux/projectsSlice';
import "./ProjectsModule.css"

interface ProjectCardProps {
  project: Project;
  onAddToCart: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onAddToCart }) => {
  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  return (
    <div className="col-12 col-sm-6 col-md-3 mb-4">
      <div className="card project-card">
        <img src={project.image} alt={project.title} className="card-img-top project-img" />
        <div className="card-body">
          <h5 className="card-title project-title">{truncateTitle(project.title, 45)}</h5>
          <p className="card-text">${project.price}</p>
          <button className="btn btn-primary" onClick={onAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
