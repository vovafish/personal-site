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
    <main className="flex flex-wrap justify-center pt-40 px-6 gap-4">
      <div className="p-5">
        <a href="#">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {projectFound?.name}
          </h1>
        </a>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addUpvote}
          type="button"
        >
          Upvote
        </button>
        <p>Project has: {projectInfo.upvotes} upvote(s)</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {projectFound?.description}
        </p>
        {projectFound?.stack.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
      <div className="">
        <Link to="/projects">Back</Link>
      </div>
      <AddCommentForm
        projectLink={projectId}
        onProjectUpdated={(updatedProjcet) => setProjectInfo(updatedProjcet)}
      />
      <div>
        <CommentsList comments={projectInfo?.comments} />
      </div>
    </main>
  );
}

export default ProjectPage;
