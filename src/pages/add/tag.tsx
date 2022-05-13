import { useState } from 'react';
import { motion } from 'framer-motion';

import LoadingHandler from '~/components/common/LoadingHandler';
import NavigationBar from '~/components/common/NavigationBar';
import { FixedSpinner } from '~/components/common/Spinner';
import TagForm from '~/components/TagForm';
import { defaultFadeInVariants } from '~/constants/motions';
import useGetTagListWithInfinite from '~/hooks/api/tag/useGetTagListWithInfinite';
import { useAppliedTags } from '~/store/AppliedTags';

export default function TagPage() {
  const { tags: appliedTags, removeTag, addTag } = useAppliedTags();
  const [keyword, setKeyword] = useState('');
  const { tags, isLoading } = useGetTagListWithInfinite({ keyword });

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
            onSearch={keyword => {
              setKeyword(keyword);
            }}
          />
        </motion.div>
      </LoadingHandler>
    </article>
  );
}
