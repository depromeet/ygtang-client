import { useEffect } from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import LoadingHandler from '~/components/common/LoadingHandler';
import NavigationBar from '~/components/common/NavigationBar';
import { FixedSpinner } from '~/components/common/Spinner';
import TagForm from '~/components/common/TagForm';
import { defaultFadeInVariants } from '~/constants/motions';
import { useInspirationById } from '~/hooks/api/inspiration/useInspirationById';
import useInspirationMutation from '~/hooks/api/inspiration/useInspirationMutation';
import useGetTagListWithInfinite from '~/hooks/api/tag/useGetTagListWithInfinite';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import useIntersectionObserver from '~/hooks/common/useIntersectionObserver';
import useQueryParam from '~/hooks/common/useRouterQuery';
import { useToast } from '~/store/Toast';
import { recordEvent } from '~/utils/analytics';

export default function EditTag() {
  const { fireToast } = useToast();
  const inspirationId = useQueryParam('id', String);
  const { push } = useInternalRouter();
  const { inspiration } = useInspirationById({
    inspirationId,
  });
  const { tags, isLoading, hasNextPage, fetchNextPage } = useGetTagListWithInfinite({});
  const { addInspirationTag, deleteInspirationTag, addInspirationTagIsLoading } =
    useInspirationMutation();

  const { setTarget } = useIntersectionObserver({
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting && hasNextPage) fetchNextPage();
    },
  });

  useEffect(() => {
    if (!inspirationId) return push('/');
  }, [push, inspirationId]);

  const hasTag = (tag: TagType) => {
    return Boolean(inspiration?.tagResponses.find(_tag => _tag.id === tag.id));
  };

  const saveTag = (tag: TagType) => {
    if (addInspirationTagIsLoading) {
      fireToast({ content: '태그를 추가중입니다. 잠시 후에 시도해주세요.', duration: 3500 });
      return;
    }
    if (hasTag(tag)) {
      fireToast({ content: '이미 존재하는 태그입니다.' });
      return;
    }
    recordEvent({ action: '영감에 태그 추가', value: tag.content });
    addInspirationTag({ id: Number(inspirationId), tagId: tag.id });
  };

  const removeTag = (tagId: number) => {
    recordEvent({ action: '영감에서 태그 삭제' });
    deleteInspirationTag({ id: Number(inspirationId), tagId });
  };

  return (
    <article css={editTagCss}>
      <NavigationBar title="영감 편집" />
      <LoadingHandler isLoading={isLoading} loadingComponent={<FixedSpinner />}>
        <motion.div
          variants={defaultFadeInVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <TagForm
            applyedTags={inspiration?.tagResponses || []}
            registeredTags={tags}
            onSave={saveTag}
            onRemove={removeTag}
          />
          {hasNextPage && !isLoading && <div ref={setTarget}></div>}
        </motion.div>
      </LoadingHandler>
    </article>
  );
}

const editTagCss = css`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;
