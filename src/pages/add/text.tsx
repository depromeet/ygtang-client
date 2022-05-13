import dynamic from 'next/dynamic';
import { css } from '@emotion/react';

import { CTAButton } from '~/components/common/Button';
import TagContent from '~/components/common/Content/TagContent';
import NavigationBar from '~/components/common/NavigationBar';
import { MemoText } from '~/components/common/TextField';
import { Input } from '~/components/common/TextField/Input';
import useInspirationMutation, {
  InspirationMutationRequest,
} from '~/hooks/api/inspiration/useInspirationMutation';
import useInput from '~/hooks/common/useInput';
import { useAppliedTags } from '~/store/AppliedTags';

import { formCss } from './image';

const AddTagFormRouteAsModal = dynamic(() => import('~/components/add/AddTagFormRouteAsModal'));

export default function AddText() {
  const inspiringText = useInput({ useDebounce: true });
  const memoText = useInput({ useDebounce: true });
  const isEmptyText = !Boolean(inspiringText.debouncedValue);
  const { tags } = useAppliedTags();
  const { createInspiration } = useInspirationMutation();

  const submitText = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inspiringText.value) return;
    const textData: InspirationMutationRequest = {
      memo: memoText.value,
      content: inspiringText.value,
      tagIds: [1],
      type: 'TEXT',
    };
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
            <CTAButton type="submit" disabled={isEmptyText}>
              Tang!
            </CTAButton>
          </section>
        </form>
      </article>
      <AddTagFormRouteAsModal />
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
