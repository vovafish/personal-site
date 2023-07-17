import { Navigate, Route } from 'react-router-dom';
import useUser from './useUser';

function PrivateRoute({ props }: any) {
  const user = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Route {...props} />;
}

export default PrivateRoute;
