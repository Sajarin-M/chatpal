import { Button } from '@mantine/core';
import { useAuth } from '$context/auth';

export default function Chats() {
  const { logout } = useAuth();

  return (
    <div>
      Chats
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
