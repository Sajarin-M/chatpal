import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Button, Divider, Stack, Text, Title } from '@mantine/core';
import { GithubButton, GoogleButton } from '$components/social-buttons';
import WavesScreen from '$components/waves-screen';

// import image from '../assets/images/landing.webp';

export default function Landing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const getStarted = searchParams.get('tab') === 'start';

  return (
    <WavesScreen
      top={
        <>
          <Title order={2}>
            Stay connected, <br />
            Anywhere you are.
          </Title>
          <Text mt='sm' size='sm'>
            Join the world's smallest chat app
          </Text>
        </>
      }
      bottom={
        getStarted ? (
          <Stack spacing='xl' m='xl'>
            <GoogleButton bg='white' h='2.8rem' radius='md'>
              Continue with Google
            </GoogleButton>
            <GithubButton h='2.8rem' radius='md'>
              Continue with GitHub
            </GithubButton>
            <Button component={Link} to='/login' h='2.8rem' radius='md'>
              Sign In with Username
            </Button>
            <Divider label='New to ChatPal ?' my='sm' labelPosition='center' />
            <Button
              bg='white'
              component={Link}
              to='/signup'
              color='indigo.9'
              variant='outline'
              h='2.8rem'
              radius='md'
            >
              Sign Up as New User
            </Button>
          </Stack>
        ) : (
          <>
            <Box
              style={{
                flexGrow: 1,
                overflow: 'hidden',
                // backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
              }}
            ></Box>
            <Button m='xl' h='2.8rem' radius='md' onClick={() => navigate('?tab=start')}>
              Get Started
            </Button>
          </>
        )
      }
    />
  );
}
