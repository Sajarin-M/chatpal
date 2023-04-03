import { ComponentProps } from 'react';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<ControllerProps<TFieldValues, TName>, 'name' | 'control' | 'rules'>;

type OmitedComponentProps<T> = Omit<
  ComponentProps<T>,
  'onChange' | 'onBlur' | 'checked' | 'value' | 'ref'
>;
