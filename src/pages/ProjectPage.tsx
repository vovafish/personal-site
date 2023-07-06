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
    <>
      <h1>{projectFound?.name}</h1>
      <h2>{projectFound?.description}</h2>
      {projectFound?.stack.map((item) => (
        <p key={projectFound.link}>{item}</p>
      ))}
    </>
  );
}

export default ProjectPage;
