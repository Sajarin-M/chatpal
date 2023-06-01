import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { Group, Stack, Title } from '@mantine/core';
import { thickInputProps } from '$utils/constants';
import validation from '$utils/validation';
import { useAuth } from '$context/auth';
import { trpc } from '$context/trpc';
import BackButton from '$components/back-button';
import { PasswordInput, SubmitButton, TextInput } from '$components/form';
import WavesScreen from '$components/waves-screen';

export default function Signup() {
  const { login, user } = useAuth();
  const { mutateAsync } = trpc.users.signup.useMutation({
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

  const required = validation().required().build();

  return (
    <WavesScreen
      top={
        <>
          <Group spacing='lg'>
            <BackButton />
            <Title order={2}>Sign Up</Title>
          </Group>
        </>
      }
      bottom={
        <form
          onSubmit={handleSubmit(async (values) => {
            try {
              await mutateAsync(values);
            } catch (error) {}
          })}
        >
          <Stack py='sm' px='md'>
            <TextInput
              {...thickInputProps}
              rules={required}
              withAsterisk
              control={control}
              label='Name'
              name='name'
            />
            <TextInput
              {...thickInputProps}
              rules={required}
              withAsterisk
              control={control}
              name='email'
              label='Email'
            />
            <PasswordInput
              {...thickInputProps}
              rules={required}
              withAsterisk
              control={control}
              name='password'
              label='Password'
            />
            <SubmitButton mt='xl' h='2.8rem' radius='md' control={control}>
              Signup
            </SubmitButton>
          </Stack>
        </form>
      }
    />
  );
}
