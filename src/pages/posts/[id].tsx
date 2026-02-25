import { GetServerSideProps } from 'next';
import { getConnection } from '../../utils/database';
import { Post } from '../../entities/Post';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

type PostDetailProps = {
  post: Post | null;
};

export default function PostDetail({ post }: PostDetailProps) {
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-800">Post not found</h1>
          <Link href="/" className="text-blue-500 hover:text-blue-700 mt-4 inline-block">
            ← Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link href="/" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
          ← Back to Home
        </Link>
        <article className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <div className="text-gray-600 mb-4">
            <span>Category: {post.category?.name || 'Uncategorized'}</span>
            <span className="mx-2">•</span>
            <span>Posted on {new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="prose max-w-none text-gray-700">
            {post.content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const connection = await getConnection();
  const postRepository = connection.getRepository(Post);
  const post = await postRepository.findOne({
    where: { id: parseInt(id as string) },
    relations: ['category'],
  });
  return {
    props: {
      post: post ? JSON.parse(JSON.stringify(post)) : null,
    },
  };
};
