import { useRouter } from 'next/compat/router';

function useQueryParam(key: string): string | string[] | undefined;

function useQueryParam<T>(key: string, parser: (value: string | string[]) => T): T | undefined;

function useQueryParam<T>(
  key: string,
  parser?: (value: string | string[]) => T
): (string | string[] | T) | undefined {
  const router = useRouter();

  if (!router) {
    throw new Error('useQueryParam must be used under Next.js Pages Router');
  }

  const result = router.query[key];

  if (result === undefined) return undefined;
  if (parser) return parser(result);
  return result;
}

export default useQueryParam;
