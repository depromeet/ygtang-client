import { useRouter } from 'next/router';

function useQueryParam(key: string): string | string[] | undefined;

function useQueryParam<T>(key: string, parser: (value: string | string[]) => T): T | undefined;

function useQueryParam<T>(
  key: string,
  parser?: (value: string | string[]) => T
): (string | string[] | T) | undefined {
  const { query } = useRouter();
  const result = query[key];

  if (result === undefined) return undefined;
  if (parser) return parser(result);
  return result;
}

export default useQueryParam;
