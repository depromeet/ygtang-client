import React, { useEffect } from 'react';
import { css } from '@emotion/react';

import { SearchBar } from '~/components/common/TextField';
import useInput from '~/hooks/common/useInput';

import AppliedTags from './AppliedTags';
import RegisteredTagList from './RegisteredTagList';

export interface TagFormProps {
  applyedTags: TagType[];
  registeredTags: TagType[];
  onSave: (tag: TagType) => void;
  onRemove: (id: number) => void;
  onSearch?: (keyword: string) => void;
  onSubmit?: VoidFunction;
  readOnly?: boolean;
}

// NOTE: Props들을 컴포넌트내에서 관리할 수도 있지 않을까
export default function TagForm({
  applyedTags = [],
  registeredTags = [],
  onSave,
  onRemove,
  readOnly = false,
  onSearch,
  onSubmit,
}: TagFormProps) {
  const { value, setValue, onChange } = useInput({ useDebounce: false });

  useEffect(() => {
    onSearch && onSearch(value);
  }, [onSearch, readOnly, value]);

  const onFormReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit && onSubmit();
  };

  return (
    <div css={formTagCss}>
      <form css={formCss} onSubmit={onFormReturn}>
        <SearchBar
          value={value}
          onChange={onChange}
          onRemoveClick={() => {
            setValue('');
            onSearch && onSearch('');
          }}
          placeholder={readOnly ? '태그를 검색해보세요.' : '태그를 등록해보세요.'}
        />
      </form>
      {applyedTags.length > 0 && <AppliedTags applyedTags={applyedTags} onRemove={onRemove} />}
      <RegisteredTagList registeredTags={registeredTags} onClick={onSave} />
    </div>
  );
}

const formTagCss = css`
  display: flex;
  flex-direction: column;
`;

const formCss = css`
  padding: 16px 0;
`;
