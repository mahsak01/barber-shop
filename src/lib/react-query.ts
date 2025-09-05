import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: () => {
      // show notification
    },
  }),

  mutationCache: new MutationCache({
    onError: () => {
      //   showNotifications(error as unknown);
    },
  }),

  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      throwOnError: false,
      gcTime: 1000 * 60 * 60 * 24, // 24h cache time // after this time the query is going to get deleted from memory
    },
  },
});
