import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PasswordResetFail from './PasswordResetFail';
import PasswordResetSuccess from './PasswordResetSuccess';

function PasswordResetPage() {
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  const PasswordResetCode = useParams();

  const onResetClicked = async () => {
    try {
      await axios.put(`/api/users/${PasswordResetCode}/reset-password`, {
        newPassword: passwordValue,
      });
      setIsSuccess(true);
    } catch (e) {
      setIsFailure(true);
    }
  };

  if (isFailure) return <PasswordResetFail />;
  if (isSuccess) return <PasswordResetSuccess />;
  return (
    <div>
      <h1>Reset Password!</h1>
      <p>Please enter a new password</p>
      <input
        type="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      <input
        type="password"
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
      />
      <button
        onClick={onResetClicked}
        type="submit"
        disabled={
          !passwordValue ||
          !confirmPasswordValue ||
          passwordValue !== confirmPasswordValue
        }
      />
    </div>
  );
}

export default PasswordResetPage;
