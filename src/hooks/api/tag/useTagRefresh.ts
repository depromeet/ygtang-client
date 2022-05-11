import { useQueryClient } from 'react-query';

export const TAG_LIST_QUERY_KEY = 'tags';

export default function useTagRefresh() {
  const queryClient = useQueryClient();

  const refresh = () => {
    queryClient.invalidateQueries([TAG_LIST_QUERY_KEY]);
  };

  return { refresh };
}
