import { useState, useEffect, useRef } from "react";
import PostCard from "./PostCard";

// Generate realistic random timestamp (within last 48 hrs)
function generateTimestamp() {
  const now = new Date();
  const minutesAgo = Math.floor(Math.random() * 60 * 48);
  return new Date(now.getTime() - minutesAgo * 60000);
}

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  const fetchPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      // ✅ Fetch meaningful English posts
      const postRes = await fetch(
        `https://dummyjson.com/posts?limit=5&skip=${(page - 1) * 5}`
      );
      const postJson = await postRes.json();
      const postData = postJson.posts;

      if (postData.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      // ✅ Fetch users
      const userRes = await fetch("https://dummyjson.com/users?limit=100");
      const userJson = await userRes.json();
      const users = userJson.users;

      // ✅ Merge posts + random users + timestamp
      const merged = postData.map(post => {
        const randomUser = users[Math.floor(Math.random() * users.length)];

        return {
          ...post,
          username: randomUser.username,
          createdAt: generateTimestamp()
        };
      });

      // ✅ Add newest posts at TOP (Instagram behavior)
      setPosts(prev => [...merged, ...prev]);

      setPage(prev => prev + 1);
    } catch (err) {
      console.error("Fetch error:", err);
    }

    setLoading(false);
  };

  // First load
  useEffect(() => {
    fetchPosts();
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchPosts();
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loading, hasMore]);

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id + post.username} post={post} />
      ))}

      {loading && (
        <p className="text-center text-gray-500 py-4">Loading...</p>
      )}

      <div ref={loaderRef} className="h-10"></div>

      {!hasMore && (
        <p className="text-center text-gray-400 py-4">No more posts</p>
      )}
    </div>
  );
}