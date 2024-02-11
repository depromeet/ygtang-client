import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/compat/router';
import { motion } from 'framer-motion';

import { GhostButton } from '~/components/common/Button';
import LoadingHandler from '~/components/common/LoadingHandler';
import NavigationBar from '~/components/common/NavigationBar';
import { FixedSpinner } from '~/components/common/Spinner';
import TagForm from '~/components/common/TagForm';
import { defaultFadeInVariants } from '~/constants/motions';
import useGetTagListWithInfinite from '~/hooks/api/tag/useGetTagListWithInfinite';
import useTagMutation from '~/hooks/api/tag/useTagMutation';
import useTagRefresh from '~/hooks/api/tag/useTagRefresh';
import useIntersectionObserver from '~/hooks/common/useIntersectionObserver';
import { useAppliedTags } from '~/store/AppliedTags';
import { recordEvent } from '~/utils/analytics';

export default function TagPage() {
  const router = useRouter();
  const { tags, isLoading, hasNextPage, fetchNextPage } = useGetTagListWithInfinite({});
  const { tags: appliedTags, removeTag, addTag } = useAppliedTags();

  const { setTarget } = useIntersectionObserver({
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting && hasNextPage) fetchNextPage();
    },
  });

  const { createTag } = useTagMutation();
  const { refresh: tagListRefresh } = useTagRefresh();

  const lastKeyword = useRef<string | null>(null);
  const [keyword, setKeyword] = useState('');

  const { tags: searchedTags, isLoading: isSeachLoading } = useGetTagListWithInfinite({
    keyword,
    isExactlySame: true,
  });

  const saveCreatedTag = useCallback(
    (keyword: string) => {
      createTag(keyword, {
        onSuccess: data => {
          recordEvent({ action: '태그 생성', value: keyword, label: '영감 편집 화면' });
          addTag({ ...data, count: 1 });
          tagListRefresh();
        },
      });
    },
    [createTag, addTag, tagListRefresh]
  );

  const onSubmit = () => {
    if (keyword === lastKeyword.current || isSeachLoading) return;
    if (!keyword) return;

    if (!searchedTags.length) {
      saveCreatedTag(keyword);
    } else {
      addTag(searchedTags[0]);
    }

    lastKeyword.current = keyword;
  };

  return (
    <article>
      <NavigationBar
        title="태그 추가"
        backLinkScrollOption={false}
        rightElement={
          <GhostButton
            size="large"
            onClick={() => {
              router && router.back();
            }}
          >
            완료
          </GhostButton>
        }
      />

      <LoadingHandler isLoading={isLoading} loadingComponent={<FixedSpinner />}>
        <motion.div
          variants={defaultFadeInVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <TagForm
            applyedTags={appliedTags}
            registeredTags={tags}
            onSave={addTag}
            onRemove={removeTag}
            onSearch={keyword => {
              setKeyword(keyword);
            }}
            onSubmit={onSubmit}
          />
          {hasNextPage && !isLoading && <div ref={setTarget}></div>}
        </motion.div>
      </LoadingHandler>
    </article>
  );
}
