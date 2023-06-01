import { TbArrowLeft, TbMoodSmile, TbSend } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Box, Flex, Group, Input, Text } from '@mantine/core';
import { headerHeight } from '$utils/constants';
import Avatar from '$components/avatar';

export default function SingleChat() {
  const navigate = useNavigate();

  return (
    <Flex direction='column' className='size-screen'>
      <Group bg='blue.8' c='white' px='sm' h={headerHeight} spacing='xs'>
        <ActionIcon
          onClick={() => {
            navigate(-1);
          }}
          c='white'
          variant='transparent'
        >
          <TbArrowLeft />
        </ActionIcon>
        <Avatar text='C' size={38} />
        <Box>
          <Text weight={600} size={15}>
            Chat
          </Text>
          <Text size={11}>sdf</Text>
        </Box>
      </Group>
      <Box style={{ flexGrow: 1, overflow: 'scroll' }}>
        <Box>
          <Box m='xs' mr='2rem'>
            <Text color='gray.9' size={10}>
              10:00 AM
            </Text>
            <Text
              w='fit-content'
              py={8}
              px='md'
              size={14.5}
              sx={(theme) => ({
                borderTopRightRadius: theme.radius.lg,
                borderBottomLeftRadius: theme.radius.lg,
                borderBottomRightRadius: theme.radius.lg,
              })}
              bg='gray.3'
              display='inline-block'
            >
              Hi
            </Text>
          </Box>
        </Box>
        <Flex justify='end'>
          <Box ml='2rem' m='xs'>
            <Text align='end' color='gray.9' size={10}>
              10:00 AM
            </Text>
            <Text
              ml='auto'
              w='fit-content'
              c='gray.1'
              py={8}
              px='md'
              size={14.5}
              sx={(theme) => ({
                borderTopLeftRadius: theme.radius.lg,
                borderBottomLeftRadius: theme.radius.lg,
                borderBottomRightRadius: theme.radius.lg,
              })}
              bg='gray.7'
            >
              Hi
            </Text>
          </Box>
        </Flex>
      </Box>
      <Group p='xs' spacing='xs' noWrap>
        <Input
          icon={<TbMoodSmile size='1.5rem' />}
          autoFocus
          style={{ flexGrow: 1 }}
          variant='unstyled'
          size='md'
          styles={(theme) => ({
            input: {
              backgroundColor: theme.colors.gray[2],
              borderRadius: theme.radius.xl,
              paddingInline: theme.spacing.md,
              fontSize: theme.fontSizes.sm,
            },
          })}
        />
        <ActionIcon variant='filled' color='blue' size={40} radius='xl'>
          <TbSend />
        </ActionIcon>
      </Group>
    </Flex>
  );
}
