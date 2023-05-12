import Head from 'next/head';

import useInternalRouter from '~/hooks/common/useInternalRouter';

const BASE_URL = 'https://app.ygtang.kr/';
const DEFAULT_DESCRIPTION = '영감탱 - 빛나는 아이디어를 모아드려요';
const DEFAULT_OG_IMAGE = './og.webp';

interface Props {
  /**
   * @description title에 적용될 문자열 입니다. 넣은 문자열 뒤에 ' | 영감탱'이 붙습니다.
   * @default '영감탱'
   */
  title?: string;
  /**
   * @description description에 적용될 문자열 입니다.
   * @default '영감탱 - 빛나는 아이디어를 모아드려요'
   */
  description?: string;
  /**
   * @description og:image에 적용될 문자열 입니다.
   * @default './og.webp'
   */
  ogImage?: string;
}

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  ogImage = DEFAULT_OG_IMAGE,
}: Props) {
  const router = useInternalRouter();

  const TITLE = title ? `${title} | 영감탱` : '영감탱';
  const URL = BASE_URL + router.asPath;

  return (
    <Head>
      <title>{TITLE}</title>
      <link rel="canonical" href={URL} />
      <meta name="description" content={description} />

      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={URL} />

      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}
