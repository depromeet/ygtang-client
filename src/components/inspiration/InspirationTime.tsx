import { useMemo } from 'react';
import { css, Theme } from '@emotion/react';

interface InspirationTimeProps {
  updatedDatetime: string;
}

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];

export default function InspirationTime({ updatedDatetime }: InspirationTimeProps) {
  const formattedTime = useMemo(() => {
    const updateDate = new Date(updatedDatetime.replace(/-/g, '/'));

    const year = updateDate.getFullYear();
    const month = updateDate.getMonth() + 1;
    const date = updateDate.getDate();
    const day = WEEK[updateDate.getDay()];
    const time = updatedDatetime.slice(11, 16);

    return `${year}년 ${month}월 ${date}일 (${day}) ${time}`;
  }, [updatedDatetime]);

  return (
    <p css={timeCss}>
      <time dateTime={updatedDatetime}>{formattedTime}</time>
    </p>
  );
}

const timeCss = (theme: Theme) => css`
  margin-top: 16px;

  text-align: right;
  font-size: 12px;
  color: ${theme.color.gray04};
  line-height: 1.2;
`;
