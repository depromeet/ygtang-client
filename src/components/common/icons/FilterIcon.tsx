import { PropsWithChildren } from 'react';

import Svg, { SvgProps } from '~/components/common/Svg';

export function FilterIcon({ ...props }: PropsWithChildren<SvgProps>) {
  return (
    <Svg viewBox={24} {...props}>
      <path d="M4.25 5.61C6.57 8.59 10 13 10 13v5c0 1.1.9 2 2 2s2-.9 2-2v-5s3.43-4.41 5.75-7.39c.51-.66.04-1.61-.8-1.61H5.04c-.83 0-1.3.95-.79 1.61z" />
    </Svg>
  );
}