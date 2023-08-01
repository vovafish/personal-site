import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import PasswordResetFail from './PasswordResetFail';
import PasswordResetSuccess from './PasswordResetSuccess';
import MainBackground from '../components/MainBackground';

function PasswordResetPage() {
  const [passwordValue, setPasswordValue] = useState(''); // State variable for password input
  const [confirmPasswordValue, setConfirmPasswordValue] = useState(''); // State variable for confirm password input
  const [error, setError] = useState('');

  const [isSuccess, setIsSuccess] = useState(false); // State variable to track if password reset is successful
  const [isFailure, setIsFailuer] = useState(false); // State variable to track if password reset failed

  const { passwordResetCode } = useParams(); // Get password reset code from URL params

  const onResetClicked = async () => {
    try {
      // Check if passwords match
      if (passwordValue !== confirmPasswordValue) {
        setError('Passwords do not match.');
        return;
      }

      // Check if password is strong enough (contains both numbers and characters)
      if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(passwordValue)) {
        setError('Password must contain both numbers and characters.');
        return;
      }

      // Check if password is at least 6 characters long
      if (passwordValue.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }

      await axios.put(`/api/users/${passwordResetCode}/reset-password`, {
        // Send PUT request to reset password
        newPassword: passwordValue, // Send new password in the request body
      });
      setIsSuccess(true); // Update success state variable
    } catch (e) {
      setError('Something went wrong, please try again.');
      setIsFailuer(true); // Update failure state variable
    }
  };

  if (isFailure) return <PasswordResetFail />; // Render PasswordResetFail component if reset fails
  if (isSuccess) return <PasswordResetSuccess />; // Render PasswordResetSuccess component if reset succeeds
  return (
    <MainBackground>
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Reset Password!</h1>
          <p>Please enter a new password</p>
          <div className="flex flex-col items-center">
            <input
              type="password"
              value={passwordValue}
              placeholder="••••••••"
              onChange={(e) => setPasswordValue(e.target.value)}
              className="mt-4 p-2 border rounded-md"
            />
            <input
              type="password"
              value={confirmPasswordValue}
              placeholder="••••••••"
              onChange={(e) => setConfirmPasswordValue(e.target.value)}
              className="mt-4 p-2 border rounded-md"
            />
            <button
              onClick={onResetClicked}
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm disabled:opacity-50"
            >
              Reset
            </button>
            {error && (
              <div
                className="mt-5 flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
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
                  <span className="font-medium">
                    Welp.. that&apos;s ain&apos;t right
                  </span>
                  <ul className="list-disc pl-5">
                    <li>{error}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainBackground>
  );
}

export default PasswordResetPage;
