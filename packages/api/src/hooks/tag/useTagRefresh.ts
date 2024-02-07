import { useQueryClient } from "@tanstack/react-query";

export const TAG_LIST_QUERY_KEY = "tags";

export function useTagRefresh() {
  const queryClient = useQueryClient();

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: [TAG_LIST_QUERY_KEY] });
  };

  const reset = () => {
    queryClient.resetQueries({ queryKey: [TAG_LIST_QUERY_KEY] });
  };

  return { refresh, reset };
}
