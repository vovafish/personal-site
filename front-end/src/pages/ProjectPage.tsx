/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import projects from '../projects';
import NotFound from './NotFound';

function ProjectPage() {
  const [projectInfo, setProjectInfo] = useState({ upvotes: 0, comments: [] });

  const { projectId } = useParams();

  useEffect(() => {
    const loadProjectInfo = async () => {
      const response = await axios.get(`/api/projects/${projectId}`);

      const newProjectInfo = response.data;
      setProjectInfo(newProjectInfo);
    };
    loadProjectInfo();
  }, [projectId]);

  const projectFound = projects.find((project) => project.link === projectId);
  // get directly from useParams

  // const params = useParams();
  // const projectId = params.projectId;

  // object disctructuring
  // const { projectId } = params;

  if (!projectFound) {
    return <NotFound />;
  }
  return (
    <main className="flex flex-wrap justify-center pt-40 px-6 gap-4">
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {projectFound?.name}
          </h5>
        </a>
        <p>Project has: {projectInfo.upvotes} upvote(s)</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {projectFound?.description}
        </p>
        {projectFound?.stack.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
      <Link to="/projects">Back</Link>
    </main>
  );
}

export default ProjectPage;
