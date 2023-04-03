import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { NumberInput as MNumberInput } from '@mantine/core';
import { OmitedComponentProps, Props } from './types';

export default function NumberInput<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>,
>({ name, control, rules, ...rest }: Props<T, U> & OmitedComponentProps<typeof MNumberInput>) {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => (
        <MNumberInput {...rest} {...field} error={fieldState.error?.message} />
      )}
    />
  );
}
