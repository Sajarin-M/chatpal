import { Avatar as MAvatar, AvatarProps as MAvatarProps } from '@mantine/core';
import type { PolymorphicComponentProps } from '@mantine/utils';

// import { getImageUrl } from '$services/images';

const colors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
];

const getImageUrl = (name: string) => name;

function getRandomColor(letter?: string) {
  if (!letter) return '#fff';
  const index = letter.charCodeAt(0) % colors.length;
  return colors[index];
}

export type AvatarProps = PolymorphicComponentProps<'div', MAvatarProps> & {
  text?: string;
  name?: string;
};

export default function Avatar({ text, name, src, size = 45, ...rest }: AvatarProps) {
  src = name ? getImageUrl(name) : src;

  return (
    <MAvatar
      {...rest}
      src={src}
      size={size}
      radius='xl'
      styles={{
        placeholder: {
          backgroundColor: getRandomColor(text),
          color: 'white',
        },
      }}
    >
      {text?.charAt(0).toUpperCase()}
    </MAvatar>
  );
}
