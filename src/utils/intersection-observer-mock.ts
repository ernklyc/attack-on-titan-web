// This is a temporary mock to satisfy TypeScript until react-intersection-observer can be properly installed

export const useInView = (options?: {
  triggerOnce?: boolean;
  threshold?: number;
  rootMargin?: string;
}) => {
  return {
    ref: (node: any) => {},
    inView: true, // Always return true as a fallback
    entry: null,
  };
};

export default {
  useInView,
};