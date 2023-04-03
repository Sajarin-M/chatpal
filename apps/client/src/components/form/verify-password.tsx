import { Control, FieldValues, Path, useWatch } from 'react-hook-form';
import { PasswordInputProps } from '@mantine/core';
import PasswordInput from './password-input';

type VerifyPassword<T extends FieldValues, U> = PasswordInputProps & {
  control: Control<T, U>;
  passwordPath: Path<T>;
  verifyPath: Path<T>;
};

export default function VerifyPassword<T extends FieldValues, U>({
  control,
  verifyPath,
  passwordPath,
  ...rest
}: VerifyPassword<T, U>) {
  const password = useWatch({
    name: passwordPath,
    control,
  });

  return (
    <PasswordInput
      {...rest}
      withAsterisk
      control={control}
      rules={{
        validate: (value) =>
          value !== '' && value === password ? true : 'Please Verify Your Password',
      }}
      name={verifyPath}
      label='Verify Password'
    />
  );
}
