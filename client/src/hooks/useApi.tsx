import { useEffect, useReducer, useCallback, useState, useRef } from 'react';
import axiosInstance from '../api';
import { AxiosRequestConfig, isAxiosError } from 'axios';
import { ApplicationError } from '../handlers/ApplicationError';

interface State<T> {
  data?: T;
  error?: Error;
  loading?: boolean;
}

type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error }
  | { type: 'setData'; payload: T };

type UseApiProps = { throwError?: boolean; requestConfig: AxiosRequestConfig };

function useApi<T = unknown>({ throwError, requestConfig }: UseApiProps) {
  const [controller, setController] = useState<AbortController | null>(null);
  const isResolved = useRef(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    loading: false
  };

  const apiReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState };
      case 'fetched':
        return { ...initialState, data: action.payload };
      case 'error':
        return { ...initialState, error: action.payload };
      case 'setData': {
        return { ...initialState, data: action.payload };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(apiReducer, initialState);

  const submit = useCallback(
    async ({ callback }: { callback?: (data: T) => void } = {}) => {
      setController(new AbortController());

      dispatch({ type: 'loading' });

      try {
        const response = await axiosInstance(requestConfig);
        const data = response.data as T;

        callback && callback(data);

        if (!isResolved.current) {
          isResolved.current = true;
        }

        dispatch({ type: 'fetched', payload: data });
      } catch (error) {
        if (isAxiosError(error) && throwError) {
          throw new ApplicationError({
            message: error.message,
            statusCode: error.code
          });
        }

        dispatch({ type: 'error', payload: error as Error });
      }
    },
    [throwError, requestConfig]
  );

  useEffect(() => {
    return () => (controller && controller.abort()) || undefined;
  }, [controller]);

  return [state, submit, dispatch] as const;
}

export default useApi;
