import { useMutation } from 'react-query';

import { del, post } from '~/libs/api/client';

import useTagRefresh from './useTagRefresh';

export default function useTagMutation() {
  const { refresh } = useTagRefresh();

  const createTagMutation = useMutation((content: string) => post('/v1/tag/add', { content }), {
    onSuccess: () => {
      refresh();
    },
  });

  const deleteTagMutation = useMutation((id: number) => del(`/v1/tag/remove/${id}`), {
    onSuccess: () => {
      refresh();
    },
  });

  return { createTag: createTagMutation.mutate, deleteTag: deleteTagMutation.mutate };
}
