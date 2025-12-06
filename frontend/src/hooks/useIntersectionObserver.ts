import { useEffect, useRef } from 'react';

type Callback = (entries: IntersectionObserverEntry[]) => void;

interface ObserverOptions {
  root?: Element | null; // 관찰 대상의 뷰포트, 기본값은 null (즉, 브라우저 뷰포트)
  rootMargin?: string; // 뷰포트의 마진, 기본값은 '0px'
  threshold?: number | number[]; // 관찰 대상이 뷰포트에 얼마나 들어왔을 때 콜백을 실행할지 결정, 기본값은 0
}

export const useIntersectionObserver = (callback: Callback, options?: ObserverOptions) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [callback, options]);

  return targetRef;
};
