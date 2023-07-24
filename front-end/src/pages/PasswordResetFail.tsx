import { useNavigate } from 'react-router-dom';

function PasswordResetFail() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Uh oh....</h1>
      <p>Something went worng while trying to verify your password</p>
      <button type="button" onClick={() => navigate('/login')}>
        Login
      </button>
    </div>
  );
}

export default PasswordResetFail;
