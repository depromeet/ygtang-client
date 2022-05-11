import { useEffect, useState } from 'react';

interface UseIntersectionObserverProps extends IntersectionObserverInit {
  onIntersect: IntersectionObserverCallback;
}

export default function useIntersectionObserver({
  onIntersect,
  root = null,
  rootMargin = '0px',
  threshold = 0,
}: UseIntersectionObserverProps) {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  useEffect(() => {
    if (!target) return;

    const observer: IntersectionObserver = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [onIntersect, root, rootMargin, target, threshold]);

  return { setTarget };
}
