import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';

import LinkInput from '~/components/add/LinkInput';
import { CTABottomButton } from '~/components/common/Button';
import TagContent from '~/components/common/Content/TagContent';
import NavigationBar from '~/components/common/NavigationBar';
import PortalWrapper from '~/components/common/PortalWrapper';
import { FixedSpinner } from '~/components/common/Spinner';
import { MemoText } from '~/components/common/TextField';
import useInspirationMutation from '~/hooks/api/inspiration/useInspirationMutation';
import { useDataShareMessage } from '~/hooks/common/useDataShareMessage';
import useInput from '~/hooks/common/useInput';
import { useAppliedTags } from '~/store/AppliedTags';
import { useToast } from '~/store/Toast';
import { recordEvent } from '~/utils/analytics';

import { formCss } from './image';

const AddTagFormRouteAsModal = dynamic(() => import('~/components/add/AddTagFormRouteAsModal'));

export default function AddLink() {
  const {
    onChange: onMemoChange,
    debouncedValue: memoDebouncedValue,
    value: memoValue,
  } = useInput({ useDebounce: true });

  const [openGraph, setOpenGraph] = useState<OpenGraphResponse | null>(null);
  const [initalLink, setInitalLink] = useState('');

  useDataShareMessage(setInitalLink);
  const { fireToast } = useToast();

  const onMutationError = () => {
    fireToast({ content: '영감 추가 도중 오류가 발생했습니다.' });
  };

  const { createInspiration, isCreateInspirationLoading } = useInspirationMutation({
    onError: onMutationError,
  });

  const { tags } = useAppliedTags(true);

  const saveOpenGraph = useCallback((og: OpenGraphResponse | null) => {
    setOpenGraph(og);
  }, []);

  const submitLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!openGraph || !openGraph.url) return;
    const tagIds = tags.map(tag => tag.id);
    const linkData = new FormData();
    linkData.append('content', openGraph.url);
    linkData.append('memo', memoValue);
    linkData.append('type', 'LINK');
    linkData.append('tagIds', tagIds.toString());

    recordEvent({
      action: '영감 생성',
      value: '링크 영감',
      label: memoValue.length > 0 ? '메모와 함께 영감 추가' : '메모없이 영감 추가',
    });
    createInspiration(linkData);
  };

  return (
    <>
      <article css={addLinkCss}>
        <NavigationBar title="링크 추가" />

        <form onSubmit={submitLink} css={formCss}>
          <section css={addLinkTopCss}>
            <div css={contentWrapperCss}>
              <LinkInput
                initalLink={initalLink}
                openGraph={openGraph}
                saveOpenGraph={saveOpenGraph}
              />
            </div>
            <div css={contentWrapperCss}>
              <TagContent tags={tags} />
            </div>
            <div css={contentWrapperCss}>
              <MemoText
                onChange={onMemoChange}
                debouncedValue={memoDebouncedValue}
                value={memoValue}
                writable
              />
            </div>
          </section>

          <section css={addLinkBottomCss}>
            <CTABottomButton
              disabled={!Boolean(openGraph) || isCreateInspirationLoading}
              type="submit"
            >
              Tang!
            </CTABottomButton>
          </section>
        </form>
      </article>
      <AddTagFormRouteAsModal />

      <PortalWrapper isShowing={isCreateInspirationLoading}>
        <FixedSpinner opacity={0.8} />
      </PortalWrapper>
    </>
  );
}

const addLinkCss = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const addLinkTopCss = css`
  flex-grow: 1;
  overflow-y: auto;
`;

const addLinkBottomCss = css`
  margin: 8px 0 16px 0;
`;

const contentWrapperCss = css`
  padding: 16px 0;
`;
