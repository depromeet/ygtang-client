import dynamic from 'next/dynamic';
import { css } from '@emotion/react';

import { CTABottomButton } from '~/components/common/Button';
import TagContent from '~/components/common/Content/TagContent';
import NavigationBar from '~/components/common/NavigationBar';
import PortalWrapper from '~/components/common/PortalWrapper';
import { FixedSpinner } from '~/components/common/Spinner';
import { MemoText } from '~/components/common/TextField';
import { Input } from '~/components/common/TextField/Input';
import useInspirationMutation from '~/hooks/api/inspiration/useInspirationMutation';
import useInput from '~/hooks/common/useInput';
import { useAppliedTags } from '~/store/AppliedTags';
import { useToast } from '~/store/Toast';
import { recordEvent } from '~/utils/analytics';

import { formCss } from './image';

const AddTagFormRouteAsModal = dynamic(() => import('~/components/add/AddTagFormRouteAsModal'));

export default function AddText() {
  const inspiringText = useInput({ useDebounce: true });
  const memoText = useInput({ useDebounce: true });
  const isEmptyText = !Boolean(inspiringText.debouncedValue);
  const { tags } = useAppliedTags(true);
  const { fireToast } = useToast();

  const onMutationError = () => {
    fireToast({ content: '영감 추가 도중 오류가 발생했습니다.' });
  };

  const { createInspiration, isCreateInspirationLoading } = useInspirationMutation({
    onError: onMutationError,
  });

  const submitText = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inspiringText.value) return;

    const textData = new FormData();
    const tagIds = tags.map(tag => tag.id);
    textData.append('content', inspiringText.value);
    textData.append('memo', memoText.value);
    textData.append('type', 'TEXT');
    textData.append('tagIds', tagIds.toString());

    recordEvent({
      action: '영감 생성',
      value: '텍스트 영감',
      label: memoText.value.length > 0 ? '메모와 함께 영감 추가' : '메모없이 영감 추가',
    });
    createInspiration(textData);
  };

  return (
    <>
      <article css={addTextCss}>
        <NavigationBar title="글 추가" />

        <form onSubmit={submitText} css={formCss}>
          <section css={addTextTopCss}>
            <div css={contentWrapperCss}>
              <Input
                as="textarea"
                placeholder="영감을 작성해 보세요."
                value={inspiringText.value}
                onChange={inspiringText.onChange}
              />
            </div>
            <div css={contentWrapperCss}>
              <TagContent tags={tags} />
            </div>
            <div css={contentWrapperCss}>
              <MemoText
                writable
                onChange={memoText.onChange}
                debouncedValue={memoText.debouncedValue}
                value={memoText.value}
              />
            </div>
          </section>

          <section css={addTextBottomCss}>
            <CTABottomButton type="submit" disabled={isEmptyText || isCreateInspirationLoading}>
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

const addTextCss = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const addTextTopCss = css`
  flex-grow: 1;
  overflow-y: auto;
`;

const addTextBottomCss = css`
  margin: 8px 0 16px 0;
`;

const contentWrapperCss = css`
  padding: 16px 0;
`;
