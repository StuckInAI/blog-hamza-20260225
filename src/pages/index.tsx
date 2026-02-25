import { GetServerSideProps } from 'next';
import { getConnection } from '../utils/database';
import { Post } from '../entities/Post';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostList from '../components/PostList';

type HomeProps = {
  posts: Post[];
};

export default function Home({ posts }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Latest Blog Posts</h1>
        <PostList posts={posts} />
      </main>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const connection = await getConnection();
  const postRepository = connection.getRepository(Post);
  const posts = await postRepository.find({ relations: ['category'] });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
