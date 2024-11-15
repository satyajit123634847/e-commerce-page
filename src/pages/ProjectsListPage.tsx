import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../redux/projectsSlice';
import { AppDispatch, RootState } from '../redux/store';
import ProjectCard from '../components/projects/ProjectCard';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';

const ProjectsListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const status = useSelector((state: RootState) => state.projects.status);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (status === 'idle' && projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, status, projects.length]);

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query) {
        setFilteredProjects(
          projects.filter((project) =>
            project.title.toLowerCase().includes(query.toLowerCase())
          )
        );
      } else {
        setFilteredProjects(projects);
      }
    }, 500),
    [projects]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    debouncedSearch(query);
  };

  const handleAddToCart = useCallback((projectId: number) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      dispatch(addToCart({ ...project, quantity: 1 }));
      toast.success(`Added to your cart!`, { autoClose: 3000 });
    }
  }, [dispatch, projects]);

  const wrapAddToCart = useCallback((projectId: number) => {
    return () => handleAddToCart(projectId);
  }, [handleAddToCart]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading products. Please try again later.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <h1>Projects List</h1>
        </div>
        <div className="col-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <hr />
      <div className="row mt-5">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onAddToCart={wrapAddToCart(project.id)}
            />
          ))
        ) : (
          <div>No products found.</div>
        )}
      </div>
    </div>
  );
};

export default ProjectsListPage;
