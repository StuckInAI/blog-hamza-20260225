import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
          E-Commerce Blog
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
          <Link href="/admin" className="text-gray-600 hover:text-gray-800">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
