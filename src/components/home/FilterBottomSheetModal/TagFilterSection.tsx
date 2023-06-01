import Link from 'next/link';
import { css, Theme } from '@emotion/react';

import { ChevronIcon } from '~/components/common/icons';
import AppliedTags from '~/components/common/TagForm/AppliedTags';
import { useFilteredTags } from '~/store/FilteredTags';
import { recordEvent } from '~/utils/analytics';

export default function TagFilterSection() {
  const { filteredTags, removeTag } = useFilteredTags({});

  const onClickTagLink = () => {
    recordEvent({ action: '태그 필터 클릭' });
  };

  return (
    <section css={sectionCss}>
      <Link
        href="/?modal=tag"
        as="/tag"
        scroll={false}
        passHref
        css={tagFilterAnchorCss}
        onClick={onClickTagLink}
      >
        태그 <ChevronIcon direction="right" />
      </Link>
      {Boolean(filteredTags.length) && (
        <div css={tagListContainerCss}>
          <AppliedTags applyedTags={filteredTags} onRemove={removeTag} />
        </div>
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

const tagListContainerCss = css`
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
`;
