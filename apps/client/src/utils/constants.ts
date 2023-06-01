import { TextInputProps } from '@mantine/core';

export const thickInputProps: Partial<TextInputProps> = {
  radius: 'md',
  size: 'md',
  styles: (theme) => ({
    label: {
      marginLeft: 2,
      marginBottom: 3,
    },
    error: { fontSize: theme.fontSizes.xs, marginLeft: 2 },
  }),
};

export const headerHeight = '4rem';
