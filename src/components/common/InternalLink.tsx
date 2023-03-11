import { ComponentProps } from 'react';
import Link from 'next/link';

import { RouterPathType } from '~/hooks/common/useInternalRouter';

interface InternalLinkProps extends ComponentProps<typeof Link> {
  href: RouterPathType;
}

/**
 * # InternalLink
 * 
 * 내부 링크를 type safe하게 사용할 수 있는 컴포넌트입니다.
 * 
 * @param {InternalLinkProps} {@link InternalLinkProps}
 * 
 * @example ```tsx
    <InternalLink href="/">
      go home
    </InternalLink>

    <InternalLink href="/test" passhref>
      <span>
        test
      </span>
    </InternalLink>
 * ```
 */
export default function InternalLink(props: InternalLinkProps) {
  return (
    <Link {...props} legacyBehavior>
      {props.children}
    </Link>
  );
}
