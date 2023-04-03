import { Control, FieldValues, useFormState } from 'react-hook-form';
import { Button, ButtonProps } from '@mantine/core';
import type { PolymorphicComponentProps } from '@mantine/utils';

type Props<T extends FieldValues> = Omit<
  PolymorphicComponentProps<'button', ButtonProps>,
  'type'
> & {
  control: Control<T>;
};

export default function SubmitButton<T extends FieldValues>({
  control,
  children,
  loading,
  ...rest
}: Props<T>) {
  const { isSubmitting } = useFormState({
    control,
  });
  return (
    <Button {...rest} type='submit' loading={loading || isSubmitting}>
      {children}
    </Button>
  );
}
