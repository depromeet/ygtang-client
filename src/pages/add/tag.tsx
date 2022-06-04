import { motion } from 'framer-motion';

import LoadingHandler from '~/components/common/LoadingHandler';
import NavigationBar from '~/components/common/NavigationBar';
import { FixedSpinner } from '~/components/common/Spinner';
import TagForm from '~/components/common/TagForm';
import { defaultFadeInVariants } from '~/constants/motions';
import useGetTagListWithInfinite from '~/hooks/api/tag/useGetTagListWithInfinite';
import useIntersectionObserver from '~/hooks/common/useIntersectionObserver';
import { useAppliedTags } from '~/store/AppliedTags';

export default function TagPage() {
  const { tags: appliedTags, removeTag, addTag } = useAppliedTags();
  const { tags, isLoading, hasNextPage, fetchNextPage } = useGetTagListWithInfinite({});

  const { setTarget } = useIntersectionObserver({
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting && hasNextPage) fetchNextPage();
    },
  });

  return (
    <article>
      <NavigationBar title="태그 추가" backLinkScrollOption={false} />

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
          />
          {hasNextPage && !isLoading && <div ref={setTarget}></div>}
        </motion.div>
      </LoadingHandler>
    </article>
  );
}
