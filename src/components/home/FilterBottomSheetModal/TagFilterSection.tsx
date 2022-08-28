import Link from 'next/link';
import { css, Theme } from '@emotion/react';

import { ChevronIcon } from '~/components/common/icons';
import AppliedTags from '~/components/common/TagForm/AppliedTags';
import { useFilteredTags } from '~/store/FilteredTags';

export default function TagFilterSection() {
  const { filteredTags, removeTag } = useFilteredTags({});

  return (
    <section css={sectionCss}>
      <Link href="/?modal=tag" as="/tag" scroll={false} passHref>
        <a css={tagFilterAnchorCss}>
          태그
          <ChevronIcon direction="right" />
        </a>
      </Link>
      {Boolean(filteredTags.length) && (
        <AppliedTags applyedTags={filteredTags} onRemove={removeTag} />
      )}
    </section>
  );
}

const sectionCss = css`
  margin-top: 24px;
  margin-bottom: 24px;
`;

const tagFilterAnchorCss = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 24px;
  color: ${theme.color.gray05};
  text-decoration: none;

  margin-bottom: 4px;
`;
