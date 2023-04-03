import { useEffect } from 'react';
import { useAuth } from '$context/auth';

export default function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return null;
}
