import { useMutation } from 'react-query';

import { del, post } from '~/libs/api/client';

import useInspirationMutation from '../inspiration/useInspirationMutation';
import useTagRefresh from './useTagRefresh';

interface CreateTagDataResponseInterface {
  id: number;
  content: string;
}

export default function useTagMutation() {
  const { reset } = useTagRefresh();
  const { resetInspirationList, removeWholeInspirationById } = useInspirationMutation();

  const createTagMutation = useMutation<
    CreateTagDataResponseInterface,
    { message?: string },
    string
  >((content: string) => post<CreateTagDataResponseInterface>('/v1/tag/add', { content }), {
    onSuccess: () => {
      reset();
    },
  });

  const deleteTagMutation = useMutation((id: number) => del(`/v1/tag/remove/${id}`), {
    onSuccess: () => {
      reset();
      resetInspirationList();
      removeWholeInspirationById();
    },
  });

  return { createTag: createTagMutation.mutate, deleteTag: deleteTagMutation.mutate };
}
