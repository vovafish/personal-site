/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState, useEffect } from 'react';
import axios from 'axios';

import ProjectsList from '../components/ProjectsList';

function ProjectsListPage() {
  const [projectInfo, setProjectInfo] = useState([]);

  useEffect(() => {
    const loadProjectInfo = async () => {
      const response = await axios.get(`/api/projects`);
      const newProjectInfo = response.data;
      setProjectInfo(newProjectInfo);
    };
    loadProjectInfo();
  }, []);

  return <ProjectsList projects={projectInfo} />;
}

export default ProjectsListPage;
