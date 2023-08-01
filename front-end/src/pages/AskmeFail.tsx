import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MainBackground from '../components/MainBackground';

function AskmeFail() {
  const navigate = useNavigate();

  // Redirect to cars page after 6 seconds
  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 6000);
  }, [navigate]);

  return (
    <MainBackground>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg">
          <p className="text-lg font-semibold">Error: Form Submission Failed</p>
          <p className="text-sm mt-2">
            We apologize, but there was an error processing your form
            submission.
          </p>
          <p className="text-sm mt-2">
            Please try again later or contact us through alternative methods.
          </p>
        </div>
      </div>
    </MainBackground>
  );
}

export default AskmeFail;
