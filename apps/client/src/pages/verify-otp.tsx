import { Controller, useForm } from 'react-hook-form';
import { Box, Group, PinInput, Stack, Text, Title } from '@mantine/core';
import BackButton from '$components/back-button';
import { SubmitButton, Watcher } from '$components/form';
import WavesScreen from '$components/waves-screen';

export default function VerifyOtp() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      otp: '',
    },
  });

  return (
    <WavesScreen
      top={
        <>
          <Group spacing='lg'>
            <BackButton />
            <Title order={2}>Verify OTP</Title>
          </Group>
          <Text mt='sm' size='sm'>
            We have sent an OTP to your email
          </Text>
        </>
      }
      bottom={
        <form
          onSubmit={handleSubmit(async (values) => {
            try {
              // await mutateAsync(values);
              console.log(values);
            } catch (error) {}
          })}
        >
          <Box w='auto'>
            <Stack align='center' py='xl' px='md' spacing={30}>
              <Controller
                control={control}
                name='otp'
                render={({ field, fieldState }) => (
                  <PinInput
                    {...field}
                    type='number'
                    oneTimeCode
                    size='xl'
                    radius='md'
                    error={!!fieldState.error}
                  />
                )}
              />

              <Watcher
                control={control}
                name='otp'
                render={(value) => (
                  <SubmitButton
                    disabled={value.length < 4}
                    h='2.8rem'
                    w='9rem'
                    radius='md'
                    control={control}
                  >
                    Verify
                  </SubmitButton>
                )}
              />
            </Stack>
          </Box>
        </form>
      }
    />
  );
}
