import { useState } from 'react';

function useToken(): [string | null, (newToken: string | null) => void] {
  const [token, setTokenInternal] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setTokenInternal(newToken);
  };

  return [token, setToken];
}

export default useToken;
