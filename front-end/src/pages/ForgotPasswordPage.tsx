import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import MainBackground from '../components/MainBackground';

function ForgotPasswordPage() {
  const [emailValue, setEmailValue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Email format validation using regex
  const isEmailValid = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const onSubmitClicked = async () => {
    // Validate email format
    if (!isEmailValid(emailValue)) {
      setError('Invalid email format. Please enter a valid email.');
      return;
    }

    try {
      await axios.put(`/api/forgot-password/${emailValue}`);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (e) {
      // Specify the type of the caught error
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An error occurred.');
      }
    }
  };
  return success ? (
    <MainBackground>
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Success!</h1>
          <p>Check your email for a reset link.</p>
        </div>
      </div>
    </MainBackground>
  ) : (
    <MainBackground>
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Forgot Password!</h1>
          <p>Enter your email and you will receive a reset link</p>
          <input
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder="someone@gmail.com"
            className="mt-4 p-2 border rounded-md"
          />
          <button
            type="button"
            disabled={!emailValue}
            onClick={onSubmitClicked}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm disabled:opacity-50 ml-5"
          >
            Send Reset Link
          </button>
          {error && (
            <div
              className="flex mt-5 items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 mr-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <ul className="list-disc pl-5">
                  <li>{error}</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainBackground>
  );
}

export default ForgotPasswordPage;
