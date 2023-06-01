import { Global } from '@mantine/core';
import bold from './bold.woff2';
import heavy from './heavy.woff2';

export function Font() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Greycliff CF',
            src: `url('${bold}') format("woff2")`,
            fontWeight: 700,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Greycliff CF',
            src: `url('${heavy}') format("woff2")`,
            fontWeight: 900,
            fontStyle: 'normal',
          },
        },
      ]}
    />
  );
}
