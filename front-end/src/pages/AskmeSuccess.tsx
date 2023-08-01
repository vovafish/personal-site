import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MainBackground from '../components/MainBackground';

function AskmeSuccess() {
  const navigate = useNavigate();

  // Redirect to cars page after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 6000);
  }, [navigate]);
  return (
    <MainBackground>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg">
          <p className="text-lg font-semibold">Thank You!</p>
          <p className="text-sm mt-2">
            Your message has been successfully received.
          </p>
          <p className="text-sm mt-2">I will contact you soon.</p>
        </div>
      </div>
    </MainBackground>
  );
}

export default AskmeSuccess;
