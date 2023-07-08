/* eslint-disable jsx-a11y/anchor-is-valid */
import { useParams } from 'react-router-dom';

import projects from '../projects';

function ProjectPage() {
  // get directly from useParams
  const { projectId } = useParams();

  const projectFound = projects.find((project) => project.link === projectId);

  // const params = useParams();
  // const projectId = params.projectId;

  // object disctructuring
  // const { projectId } = params;
  return (
    <div className="p-5">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {projectFound?.name}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {projectFound?.description}
      </p>
      {projectFound?.stack.map((item) => (
        <p key={projectFound.link}>{item}</p>
      ))}
    </div>
  );
}

export default ProjectPage;
