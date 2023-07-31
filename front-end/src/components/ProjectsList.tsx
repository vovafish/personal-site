/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import MainBackground from './MainBackground';

interface Comment {
  postedBy: string;
  text: string;
}
interface Project {
  link: string;
  name: string;
  description: string;
  stack: string[];
  resource: string;
  image?: string;
  upvotes?: number;
  comments?: Comment[];
  view?: string;
}

interface ProjectsListProps {
  projects: Project[];
}

function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <MainBackground>
      <main className="flex flex-wrap justify-center pt-40 px-6 gap-8">
        {projects.map((project: Project) => (
          <div
            key={project.link}
            className="w-64 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-8"
          >
            <img
              className="rounded-t-lg w-full h-48"
              src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
              alt=""
            />

            <div className="p-6">
              <a href="#" className="block h-16 overflow-hidden">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {project.name}
                </h5>
              </a>
              <p className="mb-6 font-normal text-gray-700 dark:text-gray-400">
                {project.description.substring(0, 100)}...
              </p>

              <Link to={`/projects/${project.link}`}>
                <button type="button">Check this out</button>
              </Link>
            </div>
          </div>
        ))}
      </main>
    </MainBackground>
  );
}

ProjectsList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      stack: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default ProjectsList;
