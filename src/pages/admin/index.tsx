"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '../../entities/Post';
import { Category } from '../../entities/Category';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdminPostForm from '../../components/AdminPostForm';

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data);
  };

  const handleCreateOrUpdate = async (postData: Partial<Post>) => {
    const url = editingPost ? `/api/posts/${editingPost.id}` : '/api/posts';
    const method = editingPost ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    if (res.ok) {
      setEditingPost(null);
      fetchPosts();
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPosts();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Posts</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-gray-600">Title</th>
                    <th className="py-3 px-4 text-left text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-t border-gray-200">
                      <td className="py-3 px-4 text-gray-800">{post.title}</td>
                      <td className="py-3 px-4 space-x-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <AdminPostForm
                post={editingPost || undefined}
                categories={categories}
                onSubmit={handleCreateOrUpdate}
              />
              {editingPost && (
                <button
                  onClick={() => setEditingPost(null)}
                  className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
