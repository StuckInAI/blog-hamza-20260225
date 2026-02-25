import Link from 'next/link';
import { Post } from '../entities/Post';

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4 truncate">{post.content}</p>
            <Link href={`/posts/${post.id}`} className="text-blue-500 hover:text-blue-700 font-medium">
              Read More →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
