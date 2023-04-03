import { Control, FieldPath, FieldPathValue, FieldValues, useWatch } from 'react-hook-form';

type WatcherProps<T extends FieldValues = FieldValues, U extends FieldPath<T> = FieldPath<T>> = {
  control: Control<T>;
  name: U;
  render: (value: FieldPathValue<T, U>) => JSX.Element;
};

export default function Watcher<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>,
>({ control, name, render }: WatcherProps<T, U>) {
  const value = useWatch({ control, name });
  return render(value);
}
