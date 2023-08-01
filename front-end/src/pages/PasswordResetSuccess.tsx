import { useNavigate } from 'react-router-dom';

import MainBackground from '../components/MainBackground';

function PasswordResetSuccess() {
  const navigate = useNavigate();
  return (
    <MainBackground>
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Success!</h1>
          <p>
            Your password has been reset, now please login with your new
            password.
          </p>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm"
          >
            Login
          </button>
        </div>
      </div>
    </MainBackground>
  );
}

export default PasswordResetSuccess;
