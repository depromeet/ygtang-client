import React from 'react';
import { css } from '@emotion/react';

import { TagType } from '~/components/common/Tag';
import { SearchBar } from '~/components/common/TextField';
import useInput from '~/hooks/common/useInput';

import AppliedTags from './AppliedTags';
import RegisteredTagList from './RegisteredTagList';

export default function TagFrom({
  applyedTags = [],
  registeredTags = [],
  onSave,
  onRemove,
}: {
  applyedTags: TagType[];
  registeredTags: TagType[];
  onSave: (tag: TagType) => void;
  onRemove: (id: number) => void;
}) {
  const { value, setValue, onChange } = useInput({ useDebounce: false });

  const onFormReturn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    // TODO:  search API 추가
    // NOTE:  핸드폰 UI에서는 안그러겠지만 키보드로 첬을때 엔터 너무 빨리눌러서 Debounce 못쫏아오며
    //        굳이 Debounce걸어서 서치할 필요도 없기에 사용안하는것으로 결정했습니다.
    const datetime = new Date().getTime();
    const searchedTag = { id: datetime, content: value };
    if (!searchedTag) {
      onSave(createTag());
    } else {
      onSave(searchedTag);
    }
    setValue('');
  };

  const createTag = (): TagType => {
    // TODO: create tag API를 적용해야됩니다.
    const datetime = new Date().getTime();
    return { id: datetime, content: '생성했다 치자' };
  };

  return (
    <div css={formTagCss}>
      <form onSubmit={onFormReturn}>
        <SearchBar value={value} onChange={onChange} />
      </form>
      <AppliedTags applyedTags={applyedTags} onRemove={onRemove} />
      <RegisteredTagList registeredTags={registeredTags} onClick={onSave} />
    </div>
  );
}

const formTagCss = css`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;
