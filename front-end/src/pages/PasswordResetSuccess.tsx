import { useNavigate } from 'react-router-dom';

function PasswordResetSuccess() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Success!</h1>
      <p>
        Your password has been reset, now please login with your new passwors
      </p>
      <button type="button" onClick={() => navigate('/login')}>
        Login
      </button>
    </div>
  );
}

export default PasswordResetSuccess;
