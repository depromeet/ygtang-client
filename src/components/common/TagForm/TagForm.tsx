import React, { useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';

import { SearchBar } from '~/components/common/TextField';
import useGetTagListWithInfinite from '~/hooks/api/tag/useGetTagListWithInfinite';
import useTagMutation from '~/hooks/api/tag/useTagMutation';
import useInput from '~/hooks/common/useInput';

import AppliedTags from './AppliedTags';
import RegisteredTagList from './RegisteredTagList';

export interface TagFormProps {
  applyedTags: TagType[];
  registeredTags: TagType[];
  onSave: (tag: TagType) => void;
  onRemove: (id: number) => void;
  onSearch?: (keyword: string) => void;
  readOnly?: boolean;
}

// NOTE: Props들을 컴포넌트내에서 관리할 수도 있지 않을까
export default function TagForm({
  applyedTags = [],
  registeredTags = [],
  onSave,
  onRemove,
  onSearch,
  readOnly = false,
}: TagFormProps) {
  const { value, setValue, onChange } = useInput({ useDebounce: false });
  const [keyword, setKeyword] = useState('');
  const lastKeyword = useRef<string | null>(null);
  const { tags, isLoading } = useGetTagListWithInfinite({ keyword, isExactlySame: true });
  const { createTag } = useTagMutation();

  const saveCreatedTag = useCallback(
    (keyword: string) => {
      createTag(keyword, {
        onSuccess: data => {
          onSave(data);
        },
      });
    },
    [createTag, onSave]
  );

  useEffect(() => {
    if (keyword === lastKeyword.current) return;
    if (!isLoading) onSearch && onSearch(keyword);
    if (!isLoading && keyword) {
      if (!tags.length && !readOnly) {
        saveCreatedTag(keyword);
      } else if (tags.length) {
        onSave(tags[0]);
      }
      lastKeyword.current = keyword;
      setValue('');
    }
  }, [isLoading, keyword, onSave, onSearch, saveCreatedTag, setValue, tags, readOnly]);

  const onFormReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(value);
  };

  return (
    <div css={formTagCss}>
      <form css={formCss} onSubmit={onFormReturn}>
        <SearchBar
          value={value}
          onChange={onChange}
          onRemoveClick={() => {
            setValue('');
            setKeyword('');
          }}
        />
      </form>
      {applyedTags.length ? <AppliedTags applyedTags={applyedTags} onRemove={onRemove} /> : <></>}
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
