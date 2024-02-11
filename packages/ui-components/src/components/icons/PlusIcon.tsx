import { Svg, SvgProps } from "../Svg";

export function PlusIcon({ ...props }: SvgProps) {
  return (
    <Svg viewBox={24} {...props}>
      <path d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z" />
    </Svg>
  );
}
