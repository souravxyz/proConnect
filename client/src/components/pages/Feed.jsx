import { useFeed } from "../../hooks/feed/useFeed";
import PostCard from "./posts/PostCard";

export default function Feed() {
  const { query } = useFeed();

  if (query.isLoading) return <p>Loading feed...</p>;
  if (query.isError) return <p>Failed to load feed.</p>;

  const posts = query.data?.posts || [];

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-600">
        Your Feed
      </h2>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No feed posts found.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}
