import { useRef, useState } from 'react';
import {
  TbArrowLeft,
  TbDotsVertical,
  TbLogout,
  TbPlus,
  TbSearch,
  TbSettings,
} from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';
import {
  ActionIcon,
  Box,
  CloseButton,
  Flex,
  Group,
  Input,
  Menu,
  Text,
  Transition,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { headerHeight } from '$utils/constants';
import { useAuth } from '$context/auth';
import Avatar from '$components/avatar';

export default function Chats() {
  const navigate = useNavigate();
  const chats = Array(1000).fill(0);

  return (
    <Flex direction='column' className='size-screen'>
      <Header />
      <Box style={{ flexGrow: 1 }}>
        <Virtuoso
          data={chats}
          overscan={10}
          increaseViewportBy={300}
          itemContent={(index) => {
            return (
              <Flex onClick={() => navigate(index.toString())}>
                <Box py='sm' pl='md' pr='xs'>
                  <Avatar text='C' />
                </Box>
                <Group
                  py='sm'
                  px='xs'
                  sx={(theme) => ({
                    borderBottom: `1px solid ${theme.colors.gray[3]}`,
                    flexGrow: 1,
                  })}
                >
                  <Box>
                    <Text size={14.5}>Chat {index}</Text>
                    <Text truncate size='xs' color='dimmed'>
                      Hi there! Iam using Chatpal
                    </Text>
                  </Box>
                  <Box mt={5} ml='auto' mr={5}>
                    <Text size={10}>10:30 PM</Text>
                    {index % 4 === 0 ? (
                      <Text
                        w='1rem'
                        ml='auto'
                        h='1rem'
                        c='white'
                        bg='blue.7'
                        style={{
                          borderRadius: '100%',
                          fontSize: 9,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        mt={3}
                      >
                        2
                      </Text>
                    ) : (
                      <div>&nbsp;</div>
                    )}
                  </Box>
                </Group>
              </Flex>
            );
          }}
        />
      </Box>
    </Flex>
  );
}

function Header() {
  const { logout } = useAuth();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useInputState('');

  return (
    <Box bg='blue.8' c='white' pos='relative'>
      <Group p='md' h={headerHeight} spacing={4}>
        <Text size={18} weight={600}>
          ChatPal
        </Text>

        <ActionIcon
          c='white'
          ml='auto'
          variant='transparent'
          onClick={() => {
            setSearching(true);
          }}
        >
          <TbSearch />
        </ActionIcon>
        <Menu shadow='lg' withArrow position='bottom-end'>
          <Menu.Target>
            <ActionIcon variant='transparent' c='white' mr={-6}>
              <TbDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<TbPlus />}>New Group</Menu.Item>
            <Menu.Item icon={<TbSettings />}>Settings</Menu.Item>
            <Menu.Item icon={<TbLogout />} onClick={logout}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Transition
        mounted={searching}
        transition='scale-y'
        duration={200}
        timingFunction='ease'
        onEntered={() => searchRef.current?.focus()}
      >
        {(style) => (
          <Group
            p='sm'
            h={headerHeight}
            bg='gray.1'
            pos='absolute'
            top={0}
            left={0}
            right={0}
            spacing={0}
            style={style}
            sx={(theme) => ({
              zIndex: 1,
              boxShadow: theme.shadows.xs,
            })}
          >
            <ActionIcon
              onClick={() => {
                setSearching(false);
                setSearchQuery('');
              }}
              color='dark.4'
              mr='sm'
              variant='transparent'
            >
              <TbArrowLeft />
            </ActionIcon>
            <Input
              size='xs'
              ref={searchRef}
              variant='unstyled'
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder='Search...'
              style={{ flexGrow: 1 }}
              styles={{
                input: { fontSize: 14 },
              }}
            />
            {searchQuery && (
              <CloseButton
                color='dark.4'
                ml='xs'
                variant='transparent'
                onClick={() => setSearchQuery('')}
              />
            )}
          </Group>
        )}
      </Transition>
    </Box>
  );
}
