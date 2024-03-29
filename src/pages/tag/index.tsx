import { useState } from 'react';
import { motion } from 'framer-motion';

import { GhostButton } from '~/components/common/Button';
import LoadingHandler from '~/components/common/LoadingHandler';
import NavigationBar from '~/components/common/NavigationBar';
import { FixedSpinner } from '~/components/common/Spinner';
import TagForm from '~/components/common/TagForm';
import { defaultFadeInVariants } from '~/constants/motions';
import useGetTagListWithInfinite from '~/hooks/api/tag/useGetTagListWithInfinite';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import useIntersectionObserver from '~/hooks/common/useIntersectionObserver';
import { useFilteredTags } from '~/store/FilteredTags';
import { recordEvent } from '~/utils/analytics';

export default function TagPage() {
  const { filteredTags, addTag, removeTag } = useFilteredTags({});
  const [keyword, setKeyword] = useState('');

  const { tags, isLoading, hasNextPage, fetchNextPage } = useGetTagListWithInfinite({ keyword });

  const { setTarget } = useIntersectionObserver({
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting && hasNextPage) fetchNextPage();
    },
  });

  const router = useInternalRouter();

  const onClickComplete = () => {
    recordEvent({
      action: '태그 필터 화면 완료 클릭',
      value: `${filteredTags.length}개의 태그 선택`,
    });
    router.scrollPreventedPush('/');
  };

  return (
    <article>
      <NavigationBar
        title="태그 필터"
        backLink="/"
        backLinkScrollOption={false}
        rightElement={
          <GhostButton size="large" onClick={onClickComplete}>
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
            applyedTags={filteredTags}
            registeredTags={tags}
            onSave={addTag}
            onRemove={removeTag}
            onSearch={keyword => {
              setKeyword(keyword);
            }}
            readOnly
          />
          {hasNextPage && !isLoading && <div ref={setTarget}></div>}
        </motion.div>
      </LoadingHandler>
    </article>
  );
}
