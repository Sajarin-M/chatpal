import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { Stack } from '@mantine/core';
import { useAuth } from '$context/auth';
import { trpc } from '$context/trpc';
import { SubmitButton, TextInput } from '$components/form';

export default function Signup() {
  const { login, user } = useAuth();
  const { mutate } = trpc.users.signup.useMutation({
    onSuccess: ({ token }) => login(token),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
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
        <TextInput control={control} name='name' label='Name' />
        <TextInput control={control} name='email' label='Email' />
        <TextInput control={control} name='password' label='Password' />
        <SubmitButton control={control}>Signup</SubmitButton>
      </Stack>
    </form>
  );
}
