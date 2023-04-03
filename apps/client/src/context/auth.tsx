import { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowEvent } from '@mantine/hooks';
import jwtDecode from 'jwt-decode';

const tokenKey = 'auth-token';

export function getAuthTokenFromStorage() {
  return localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey);
}

type Context = {
  token: string | null;
  logout: VoidFunction;
  user: TokenDecoded | null;
  login: (token: string, rememberMe?: boolean) => void;
};

const AuthContext = createContext<Context>({
  user: null,
  token: null,
  logout: () => {},
  login: () => {},
});
AuthContext.displayName = 'Auth Context';

export default function AuthProvider({ children }: FCWithChildren) {
  const navigate = useNavigate();
  const [token, _setToken] = useState(getAuthTokenFromStorage());

  useWindowEvent('storage', (event) => {
    if (
      (event.storageArea === localStorage || event.storageArea === sessionStorage) &&
      event.key === tokenKey &&
      event.newValue
    ) {
      setToken(event.newValue);
    }
  });

  const user = useMemo(() => {
    try {
      if (token) {
        const tokenData = jwtDecode(token) as TokenDecoded;
        return tokenData;
      }
    } catch (error) {}
    return null;
  }, [token]);

  function setToken(token: string, mode: 'localStorage' | 'sessionStorage' | 'both' = 'both') {
    if (mode === 'both') {
      localStorage.setItem(tokenKey, token);
      sessionStorage.setItem(tokenKey, token);
    } else {
      window[mode].setItem(tokenKey, token);
    }
    _setToken(token);
  }

  const login: Context['login'] = (token, keepme = true) => {
    setToken(token, keepme ? 'localStorage' : 'sessionStorage');
    navigate('/');
  };

  const logout: Context['logout'] = () => {
    setToken('');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>{children} </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
