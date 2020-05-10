import { useState, useCallback, useRef } from 'react';
import useSWR from 'swr';

export type Result<R, E> = { type: 'Ok'; value: R } | { type: 'Err'; error: E };

export const ok = <R>(value: R): Result<R, never> => ({
  type: 'Ok',
  value,
});
export const err = <E>(error: E): Result<never, E> => ({
  type: 'Err',
  error,
});

export type Status<A, E> =
  | { type: 'NotAsked' }
  | { type: 'Loading' }
  | { type: 'Success'; value: A }
  | { type: 'Failure'; error: E };

export function useRemoteData<A, E>() {
  const [status, setStatus] = useState<Status<A, E>>({ type: 'NotAsked' });

  const notAsked = useCallback(() => setStatus({ type: 'NotAsked' }), []);
  const loading = useCallback(() => setStatus({ type: 'Loading' }), []);
  const success = useCallback((value: A) => setStatus({ type: 'Success', value }), []);
  const failure = useCallback((error: E) => setStatus({ type: 'Failure', error }), []);

  return { status, notAsked, loading, success, failure };
}

type FetchOption<A, E> = {
  onSuccess?: (result: A) => void;
  onError?: (error: E) => void;
};

/**
 * A more complete functionality to `useRemoteData` for handling remote data fetching.
 * It updates the status automatically as you call your fetch function.
 *
 * It requires `fn` to be a function returning a Promise of `Result`. The purpose is to
 * offer a more type-safe approach when doing async call using Promise as Promise
 * provides only one type parameter (for success case). When it rejects, there's no way
 * we can capture the error data structure.
 */
export function useFetchRemoteData<A, E>(
  key: string | null,
  fn: () => Promise<Result<A, E>>,
  config?: FetchOption<A, E>
) {
  const remoteData = useRemoteData<A, E>();
  const cache = useRef<null | A>(null);

  useSWR(
    key,
    () => {
      if (cache.current === null) {
        remoteData.loading();
      }
      return fn();
    },
    {
      onSuccess: (result) => {
        if (result.type === 'Err') {
          remoteData.failure(result.error);
          config?.onError?.(result.error);
        }
        if (result.type === 'Ok') {
          remoteData.success(result.value);
          cache.current = result.value;

          config?.onSuccess?.(result.value);
        }
      },
    }
  );

  return remoteData;
}
