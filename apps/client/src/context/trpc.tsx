import { lazy, useEffect, useMemo, useState } from 'react';
import type { AppRouter } from '@chatpal/server';
import { showNotification } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useAuth } from './auth';

export const trpc = createTRPCReact<AppRouter>();

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then((d) => ({
    default: d.ReactQueryDevtools,
  })),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: (error: any) => {
        if ('message' in error && typeof error.message === 'string') {
          showNotification({ color: 'red', message: error.message });
        }
      },
    },
    mutations: {
      onError: (error: any) => {
        if ('message' in error && typeof error.message === 'string') {
          showNotification({ color: 'red', message: error.message });
        }
      },
    },
  },
});

export function TrpcProvider({ children }: FCWithChildren) {
  const { token } = useAuth();

  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        links: [
          httpBatchLink({
            url: 'http://localhost:3001/trpc',
            headers: () => ({
              authorization: token || '',
            }),
          }),
        ],
      }),
    [token],
  );

  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    // @ts-ignore
    window.toggleQueryDevtools = () => setShowDevtools((prev) => !prev);
  }, []);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
        {showDevtools && <ReactQueryDevtoolsProduction />}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
