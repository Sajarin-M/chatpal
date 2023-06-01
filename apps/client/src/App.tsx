import { Navigate, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import AuthProvider, { useAuth } from '$context/auth';
import { TrpcProvider, trpc } from '$context/trpc';
import { Font } from '$components/font/font';
import ProtectedRoute from '$components/protected-route';
import Chats from './pages/chats';
import Landing from './pages/landing';
import Login from './pages/login';
import Logout from './pages/logout';
import Signup from './pages/signup';
import SingleChat from './pages/single-chat';
import Test from './pages/test';
import VerifyOtp from './pages/verify-otp';

export default function App() {
  return (
    <AuthProvider>
      <TrpcProvider>
        <Font />
        <MantineProvider
          theme={{
            headings: { fontFamily: 'Greycliff CF, sans serif' },
          }}
        >
          <Notifications position='top-right' />
          <AppRoutes />
        </MantineProvider>
      </TrpcProvider>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { user } = useAuth();

  trpc.users.onLogin.useSubscription(undefined, {
    onData: (data) => {
      console.log('logged in', data);
    },
  });

  return (
    <Routes>
      <Route path='*' element={<div>page not found</div>} />
      <Route path='/' element={user ? <Navigate to='chats' /> : <Navigate to='landing' />} />
      <Route element={<ProtectedRoute condition={!!user} redirect='chats' />}>
        <Route path='landing' element={<Landing />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='verify' element={<VerifyOtp />} />
      </Route>
      <Route element={<ProtectedRoute condition={!user} redirect='login' />}>
        <Route path='chats' element={<Chats />} />
        <Route path='chats/:id' element={<SingleChat />} />
      </Route>
      <Route path='logout' element={<Logout />} />
      <Route path='test' element={<Test />} />
    </Routes>
  );
}
