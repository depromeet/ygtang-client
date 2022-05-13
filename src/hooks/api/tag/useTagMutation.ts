import { useMutation } from 'react-query';

import { del, post } from '~/libs/api/client';

import useTagRefresh from './useTagRefresh';

interface CreateTagResponseInterface {
  message: string;
  data: CreateTagDataResponseInterface;
}

interface CreateTagDataResponseInterface {
  id: number;
  content: string;
}

export default function useTagMutation() {
  const { refresh } = useTagRefresh();

  const createTagMutation = useMutation<CreateTagResponseInterface, { message?: string }, string>(
    (content: string) => post<CreateTagResponseInterface>('/v1/tag/add', { content }),
    {
      onSuccess: () => {
        refresh();
      },
    }
  );

  const deleteTagMutation = useMutation((id: number) => del(`/v1/tag/remove/${id}`), {
    onSuccess: () => {
      refresh();
    },
  });

  return { createTag: createTagMutation.mutate, deleteTag: deleteTagMutation.mutate };
}
