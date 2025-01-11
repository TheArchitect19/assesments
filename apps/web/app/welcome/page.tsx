'use client';

import { useRouter } from 'next/navigation';
import PrivateRoute from '../components/privateRoute';

export default function Welcome() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the authentication token
    localStorage.removeItem('token');

    // Redirect to the login page
    router.push('/');
  };

  return (
    <PrivateRoute>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-black">You have Successfully login !</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </PrivateRoute>
  );
}
