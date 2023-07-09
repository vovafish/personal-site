/* eslint-disable jsx-a11y/anchor-is-valid */

import projects from '../projects';
import ProjectsList from '../components/ProjectsList';

function projectsList() {
  return <ProjectsList projects={projects} />;
}

export default projectsList;
