import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { PasswordInput as MPasswordInput } from '@mantine/core';
import { OmitedComponentProps, Props } from './types';

export default function PasswordInput<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>,
>({ name, control, rules, ...rest }: Props<T, U> & OmitedComponentProps<typeof MPasswordInput>) {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => (
        <MPasswordInput {...rest} {...field} error={fieldState.error?.message} />
      )}
    />
  );
}
