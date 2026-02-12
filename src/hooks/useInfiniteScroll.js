import { useEffect } from "react";

export default function useInfiniteScroll(loaderRef, callback, loading, hasMore) {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        callback();
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loaderRef, callback, loading, hasMore]);
}