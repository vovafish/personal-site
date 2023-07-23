/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import NotFound from './NotFound';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import projects from '../projects';

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

  const addUpvote = async () => {
    const response = await axios.put(`/api/projects/${projectId}/upvote`);
    const updatedProject = response.data;
    setProjectInfo(updatedProject);
  };

  if (!projectFound) {
    return <NotFound />;
  }
  return (
    <main className="flex flex-col lg:flex-row justify-center items-start p-6 gap-4 pt-20">
      {/* Left Column - Main Content */}
      <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-6">
        <a href="#" className="text-2xl font-bold text-gray-900">
          {projectFound?.name}
        </a>
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addUpvote}
          type="button"
        >
          Upvote
        </button>
        <p className="mt-2 text-sm text-gray-700">
          {projectInfo.upvotes} upvote(s)
        </p>
        <p className="mt-4 text-gray-800 dark:text-gray-300">
          {projectFound?.description}
        </p>
        <div className="mt-2">
          {projectFound?.stack.map((item) => (
            <span
              key={item}
              className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-lg text-sm mr-2 mb-2"
            >
              {item}
            </span>
          ))}
        </div>
        <Link to="/projects" className="mt-4 text-blue-500 hover:text-blue-700">
          Back
        </Link>
      </div>

      {/* Right Column - Comments Section */}
      <div className="w-full lg:w-1/3">
        {/* AddCommentForm component */}
        <AddCommentForm
          projectLink={projectId}
          onProjectUpdated={(updatedProject: any) =>
            setProjectInfo(updatedProject)
          }
        />
        <div className="mt-6">
          {/* CommentsList component */}
          <CommentsList comments={projectInfo?.comments} />
        </div>
      </div>
    </main>
  );
}

export default ProjectPage;
