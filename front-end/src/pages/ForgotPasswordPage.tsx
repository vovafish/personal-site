import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPasswordPage() {
  const [emailValue, setEmailValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmitClicked = async () => {
    try {
      await axios.put(`/api/forgot-password/${emailValue}`);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      // Specify the type of the caught error
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg('An error occurred.');
      }
    }
  };
  return success ? (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Success!</h1>
        <p>Check your email for a reset link.</p>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Forgot Password!</h1>
        <p>Enter your email and you will receive a reset link</p>
        {errorMsg && <div className="text-red-500 mb-4">{errorMsg}</div>}
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
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm disabled:opacity-50"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
