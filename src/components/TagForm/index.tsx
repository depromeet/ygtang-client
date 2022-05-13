import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import { SearchBar } from '~/components/common/TextField';
import useGetTagListWithInfinite from '~/hooks/api/tag/useGetTagListWithInfinite';
import useTagMutation from '~/hooks/api/tag/useTagMutation';
import useInput from '~/hooks/common/useInput';

import AppliedTags from './AppliedTags';
import RegisteredTagList from './RegisteredTagList';

// NOTE: Props들을 컴포넌트내에서 관리할 수도 있지 않을까
export default function TagForm({
  applyedTags = [],
  registeredTags = [],
  onSave,
  onRemove,
  onSearch,
}: {
  applyedTags: TagType[];
  registeredTags: TagType[];
  onSave: (tag: TagType) => void;
  onRemove: (id: number) => void;
  onSearch?: (keyword: string) => void;
}) {
  const { value, setValue, onChange } = useInput({ useDebounce: false });
  const [keyword, setKeyword] = useState('');
  const { tags, isLoading } = useGetTagListWithInfinite({ keyword, isExactlySame: true });
  const { createTag } = useTagMutation();

  //TODO: API 업데이트 이후 data가 내려오면 정상 동작 예정입니다.
  //TODO: 아직 중복처리가 API 단에서 이루어지지 않아서 이렇게 작업을 올립니다.
  const saveCreatedTag = (keyword: string) => {
    createTag(keyword, {
      onSuccess: data => {
        // onSave(data.data);
        const _data = data;
        onSave({ id: 32131, content: '된다고 쳐' });
      },
    });
  };

  useEffect(() => {
    if (!isLoading) onSearch && onSearch(keyword);
    if (!isLoading && keyword) {
      if (!tags.length) {
        saveCreatedTag(keyword);
      } else {
        onSave(tags[0]);
      }
      setValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onFormReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(value);
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
