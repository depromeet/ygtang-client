import Svg, { SvgProps } from '~/components/common/Svg';

export function DownloadIcon({ ...props }: SvgProps) {
  return (
    <Svg viewBox={24} {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
    </Svg>
  );
}
