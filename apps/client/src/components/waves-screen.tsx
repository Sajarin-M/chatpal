import { ReactNode } from 'react';
import { Box, Flex } from '@mantine/core';
import Waves from '$components/waves';

type Props = { top: ReactNode; bottom: ReactNode };

export default function WavesScreen({ top, bottom }: Props) {
  return (
    <Flex direction='column' className='size-screen'>
      <Box p='xl'>{top}</Box>
      <Waves height={40} width={150} />
      <Flex
        direction='column'
        style={{
          flexGrow: 1,
        }}
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[0],
        })}
      >
        {bottom}
      </Flex>
    </Flex>
  );
}
