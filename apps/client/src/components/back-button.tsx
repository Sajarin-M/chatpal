import { TbArrowNarrowLeft } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { UnstyledButton } from '@mantine/core';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <UnstyledButton onClick={() => navigate(-1)}>
      <TbArrowNarrowLeft size='2rem' />
    </UnstyledButton>
  );
}
