import { Link } from 'react-router-dom';
import MainBackground from '../components/MainBackground';

function NotFound() {
  return (
    <MainBackground>
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:justify-center lg:gap-12">
        <div className="lg:w-1/2 bg-white rounded-lg shadow dark:border p-5 lg:mt-12 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Sorry, the page you are looking for doesn&apos;t exist. Here are
            some helpful links:
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Link
              to="/"
              type="button"
              className="w-full sm:w-auto px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
            >
              Take me home
            </Link>
          </div>
        </div>

        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <div className="text-center">
            <span className="font-caveat text-12xl">404</span>
          </div>
        </div>
      </div>
    </MainBackground>
  );
}

export default NotFound;
