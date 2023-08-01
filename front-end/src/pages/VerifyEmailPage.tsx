import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MainBackground from '../components/MainBackground';

function PleaseVerifyEamilPage() {
  const navigate = useNavigate();

  // Redirect to cars page after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, [navigate]);

  return (
    <MainBackground>
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Thanks for signing up!</h1>
          <p>
            A verification email has been sent to the email address you
            provided. Please verify your email to unlock more features.
          </p>
        </div>
      </div>
    </MainBackground>
  );
}
export default PleaseVerifyEamilPage;
