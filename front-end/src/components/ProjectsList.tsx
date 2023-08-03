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
            className="w-64 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-8 flex flex-col"
          >
            {project.image && ( // Check if project.image is defined before rendering the image
              <img
                className="rounded-t-lg w-full h-48"
                src={project.image[0]}
                alt={project.name}
              />
            )}

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <a href="#" className="block h-16 overflow-hidden">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {project.name}
                  </h5>
                </a>
                <p className="mb-6 font-normal text-gray-700 dark:text-gray-400">
                  {project.description.substring(0, 100)}...
                </p>
              </div>

              <Link
                to={`/projects/${project.link}`}
                className="mt-auto relative inline-block"
              >
                <button className="mt-auto" type="button">
                  Check this out
                </button>
                <span
                  className="absolute left-full top-1/2 w-3 h-3 bg-blue-500 transform -translate-y-1/2"
                  style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
                />
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
