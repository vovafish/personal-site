/* eslint-disable jsx-a11y/anchor-is-valid */
import { SetStateAction, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import NotFound from './NotFound';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import MainBackground from '../components/MainBackground';

function ProjectPage() {
  const [projectInfo, setProjectInfo] = useState({
    name: '',
    upvotes: 0,
    comments: [],
    description: '',
    stack: [],
    image: [],
  });

  const { projectId } = useParams();

  useEffect(() => {
    const loadProjectInfo = async () => {
      const response = await axios.get(`/api/projects/${projectId}`);

      const newProjectInfo = response.data;
      setProjectInfo(newProjectInfo);
    };
    loadProjectInfo();
  }, [projectId]);

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

  if (!projectInfo) {
    return <NotFound />;
  }

  // Configuring the carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Show navigation arrows
  };

  return (
    <MainBackground>
      <main className="flex flex-col lg:flex-row justify-center items-start p-6 gap-4 pt-20">
        {/* Left Column - Main Content */}
        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-10">
          <div className="mb-8">
            <a href="#" className="text-2xl font-bold text-gray-900">
              {projectInfo.name}
            </a>
          </div>
          <div className="mt-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={addUpvote}
              type="button"
            >
              Upvote
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-700">
            {projectInfo?.upvotes
              ? `${projectInfo?.upvotes} upvote(s)`
              : '0 upvotes'}
          </p>
          {/* Add the carousel here */}
          <div className="pt-6 pb-6">
            <Slider {...carouselSettings}>
              {projectInfo.image.map((image) => (
                <div key={image + Math.random()}>
                  <img src={image} alt={image} className="w-full h-full" />
                </div>
              ))}
            </Slider>
          </div>
          <p className="mt-4 text-gray-800 dark:text-gray-300">
            {projectInfo.description}
          </p>
          <div className="mt-2">
            {projectInfo?.stack.map((item) => (
              <span
                key={item}
                className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-lg text-sm mr-2 mb-2"
              >
                {item}
              </span>
            ))}
          </div>
          <Link
            to="/projects"
            className="mt-4 ml-10 text-blue-500 hover:text-blue-700 relative"
          >
            <span
              className="absolute -left-5 top-1/2 w-3 h-3 bg-blue-500 transform -translate-y-1/2"
              style={{ clipPath: 'polygon(100% 0, 0% 50%, 100% 100%)' }}
            />
            Back
          </Link>
        </div>

        {/* Right Column - Comments Section */}
        <div className="w-full lg:w-1/3">
          {/* AddCommentForm component */}
          <AddCommentForm
            comments={projectInfo.comments}
            projectLink={projectId}
            onProjectUpdated={(
              updatedProject: SetStateAction<{
                name: string;
                upvotes: number;
                comments: never[];
                description: string;
                stack: never[];
              }>
            ) => setProjectInfo(updatedProject)}
          />
          <div className="mt-6">
            {/* CommentsList component */}
            <CommentsList comments={projectInfo?.comments} />
          </div>
        </div>
      </main>
    </MainBackground>
  );
}

export default ProjectPage;
