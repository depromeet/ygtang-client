import { css } from '@emotion/react';

import ContentHeader from '~/components/home/ContentHeader';
import ContentView from '~/components/home/ContentView';
import { useToast } from '~/store/Toast/useToast';

export default function Root() {
  const { fireToast } = useToast();

  return (
    <article>
      <button
        onClick={() => fireToast({ content: '짧은 알림' })}
        css={css`
          &:active {
            background-color: red;
          }
        `}
      >
        짧은 알림
      </button>
      <button
        onClick={() => fireToast({ content: '긴 알림', duration: 3000 })}
        css={css`
          &:active {
            background-color: red;
          }
        `}
      >
        긴 알림
      </button>
      <ContentHeader />
      <ContentView />
    </article>
  );
}
