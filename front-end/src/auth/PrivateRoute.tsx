import { Navigate, Route } from 'react-router-dom';

function PrivateRoute({ props }: any) {
  const user = null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Route {...props} />;
}

export default PrivateRoute;
