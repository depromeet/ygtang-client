import type { PropsWithChildren } from 'react';

export interface SvgProps {
  /**
   * width, height 값입니다. 사전 지정된 width, height이 존재한다면 무시됩니다.
   */
  size?: number;

  /**
   * width 값입니다. size가 존재하더라도 해당 값이 사용됩니다.
   */
  width?: number;

  /**
   * height 값입니다. size가 존재하더라도 해당 값이 사용됩니다.
   */
  height?: number;

  /**
   * fill 색상 값입니다. `isUsingFill`로 사용하지 않을 수 있습니다.
   *
   * 기본 값은 `"currentColor"` 입니다.
   */
  color?: string;

  /**
   * `color` prop으로 fill을 사용할 지에 대한 여부입니다.
   *
   * 보통은 사용되지 않으나 SVG의 구성이 특이하여 parent의 fill로는 해결되지 않을 때에 사용합니다.
   */
  isUsingFill?: boolean;
}

export interface SvgComponentProps {
  /**
   * SVG의 `viewBox` 옵션입니다.
   *
   * @example
   * 1. "0 0 200 50" 인 경우, `[0, 0, 200, 50]`로 입력하면 됩니다.
   * 2. "0 0 24 24" 처럼 width, height가 동일한 경우 `24`만 입력해도 됩니다.
   */
  viewBox?: [number, number, number, number] | number;
}

export default function Svg({
  size,
  width,
  height,
  viewBox,
  color,
  isUsingFill = true,
  children,
}: PropsWithChildren<SvgProps & SvgComponentProps>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? size ?? 24}
      height={height ?? size ?? 24}
      viewBox={
        viewBox
          ? typeof viewBox === 'number'
            ? `0 0 ${viewBox} ${viewBox}`
            : viewBox.join(' ')
          : '0 0 24 24'
      }
      fill={isUsingFill ? color ?? 'currentColor' : undefined}
    >
      {children}
    </svg>
  );
}
