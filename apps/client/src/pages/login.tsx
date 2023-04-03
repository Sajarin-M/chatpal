import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { Stack } from '@mantine/core';
import { useAuth } from '$context/auth';
import { trpc } from '$context/trpc';
import { SubmitButton, TextInput } from '$components/form';

export default function Login() {
  const { user, login } = useAuth();

  const { mutate } = trpc.users.login.useMutation({
    onSuccess: ({ token }) => login(token),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  if (user) return <Navigate to='/' />;

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        mutate(values);
      })}
    >
      <Stack>
        <TextInput control={control} name='username' label='Email' />
        <TextInput control={control} name='password' label='Password' />
        <SubmitButton control={control}>Login</SubmitButton>
      </Stack>
    </form>
  );
}
