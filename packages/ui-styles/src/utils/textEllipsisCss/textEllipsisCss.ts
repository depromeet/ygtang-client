import { css } from "@emotion/react";

export function textEllipsisCss(line: number) {
  return css`
    display: -webkit-box;
    -webkit-line-clamp: ${line};
    -webkit-box-orient: vertical;

    white-space: "no-wrap";
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}
