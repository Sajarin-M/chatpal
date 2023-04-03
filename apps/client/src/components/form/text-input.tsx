import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { TextInput as MTextInput } from '@mantine/core';
import { OmitedComponentProps, Props } from './types';

export default function TextInput<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>,
>({ name, control, rules, ...rest }: Props<T, U> & OmitedComponentProps<typeof MTextInput>) {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => (
        <MTextInput {...rest} {...field} error={fieldState.error?.message} />
      )}
    />
  );
}
