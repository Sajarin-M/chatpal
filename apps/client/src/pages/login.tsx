import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Group, Stack, Title } from '@mantine/core';
import { thickInputProps } from '$utils/constants';
import validation from '$utils/validation';
import { useAuth } from '$context/auth';
import { trpc } from '$context/trpc';
import BackButton from '$components/back-button';
import { PasswordInput, SubmitButton, TextInput } from '$components/form';
import { ProtectedRouteState } from '$components/protected-route';
import WavesScreen from '$components/waves-screen';

export default function Login() {
  const { login } = useAuth();
  const state = useLocation().state as ProtectedRouteState;
  const navigate = useNavigate();

  const { mutateAsync } = trpc.users.login.useMutation({
    onSuccess: ({ token }) => login(token),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const required = validation().required().build();

  return (
    <WavesScreen
      top={
        <>
          <Group spacing='lg'>
            <BackButton />
            <Title order={2}>Login</Title>
          </Group>
        </>
      }
      bottom={
        <form
          onSubmit={handleSubmit(async (values) => {
            try {
              await mutateAsync(values);
              const nextLocation = state?.from ?? '/chats';
              navigate(nextLocation);
            } catch (error) {}
          })}
        >
          <Stack py='sm' px='md'>
            <TextInput
              {...thickInputProps}
              withAsterisk
              control={control}
              rules={required}
              name='username'
              label='Email'
            />
            <PasswordInput
              {...thickInputProps}
              withAsterisk
              control={control}
              rules={required}
              name='password'
              label='Password'
            />
            <SubmitButton mt='xl' h='2.8rem' radius='md' control={control}>
              Login
            </SubmitButton>
          </Stack>
        </form>
      }
    />
  );
}
