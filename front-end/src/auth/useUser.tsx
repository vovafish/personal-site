import { useState, useEffect } from 'react';
import useToken from './useToken';

function useUser() {
  const [storedToken] = useToken();

  const getPayloadFromToken = (token: string) => {
    const encodedPayload = token.split('.')[1];
    return JSON.parse(atob(encodedPayload));
  };

  const [user, setUser] = useState(() => {
    if (!storedToken) return null;
    return getPayloadFromToken(storedToken);
  });

  useEffect(() => {
    if (!storedToken) {
      setUser(null);
    } else {
      setUser(getPayloadFromToken(storedToken));
    }
  }, [storedToken]);

  return user;
}

export default useUser;
