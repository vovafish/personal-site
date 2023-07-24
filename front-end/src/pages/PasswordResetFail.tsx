import { useNavigate } from 'react-router-dom';

function PasswordResetFail() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Uh oh....</h1>
        <p>Something went wrong while trying to verify your password</p>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default PasswordResetFail;
