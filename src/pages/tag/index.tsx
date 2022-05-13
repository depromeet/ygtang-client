import { useState } from 'react';
import { motion } from 'framer-motion';

import LoadingHandler from '~/components/common/LoadingHandler';
import NavigationBar from '~/components/common/NavigationBar';
import { FixedSpinner } from '~/components/common/Spinner';
import TagForm from '~/components/TagForm';
import { defaultFadeInVariants } from '~/constants/motions';
import useGetTagListWithInfinite from '~/hooks/api/tag/useGetTagListWithInfinite';
import { useFilteredTags } from '~/store/FilteredTags';

export default function TagPage() {
  const { filteredTags, addTag, removeTag } = useFilteredTags({});
  const [keyword, setKeyword] = useState('');
  const { tags, isLoading } = useGetTagListWithInfinite({ keyword });

  return (
    <article>
      <NavigationBar title="태그 필터" backLink="/" backLinkScrollOption={false} />

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
        </motion.div>
      </LoadingHandler>
    </article>
  );
}
