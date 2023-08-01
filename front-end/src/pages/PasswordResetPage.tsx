import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import PasswordResetFail from './PasswordResetFail';
import PasswordResetSuccess from './PasswordResetSuccess';
import MainBackground from '../components/MainBackground';

function PasswordResetPage() {
  const [passwordValue, setPasswordValue] = useState(''); // State variable for password input
  const [confirmPasswordValue, setConfirmPasswordValue] = useState(''); // State variable for confirm password input

  const [isSuccess, setIsSuccess] = useState(false); // State variable to track if password reset is successful
  const [isFailure, setIsFailuer] = useState(false); // State variable to track if password reset failed

  const { passwordResetCode } = useParams(); // Get password reset code from URL params

  const onResetClicked = async () => {
    try {
      await axios.put(`/api/users/${passwordResetCode}/reset-password`, {
        // Send PUT request to reset password
        newPassword: passwordValue, // Send new password in the request body
      });
      setIsSuccess(true); // Update success state variable
    } catch (e) {
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
          <input
            type="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            className="mt-4 p-2 border rounded-md"
          />
          <input
            type="password"
            value={confirmPasswordValue}
            onChange={(e) => setConfirmPasswordValue(e.target.value)}
            className="mt-4 p-2 border rounded-md"
          />
          <button
            onClick={onResetClicked}
            type="submit"
            disabled={
              !passwordValue ||
              !confirmPasswordValue ||
              passwordValue !== confirmPasswordValue
            }
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm disabled:opacity-50"
          >
            Reset
          </button>
        </div>
      </div>
    </MainBackground>
  );
}

export default PasswordResetPage;
